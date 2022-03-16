<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Consulta Front</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="salvar" v-if="formulario">
        <label>Tipo</label>
        <input
          type="text"
          placeholder="Tipo"
          v-model="consulta.type"
          v-on:keypress="isLetter($event)"
          maxlength="40"
        />
        <label>Data</label>
        <input
          type="date"
          class="datepicker"
          placeholder="Inicio"
          v-model="consulta.startAt"
        />
        <label>Hora</label>
        <input type="time" class="timepicker" v-model="hora" />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <div id="modal-1" ref="ficha-paciente" v-if="dados">
        <ficha-paciente />
      </div>

      <table v-if="tabela">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Inico</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="consulta of consultations" :key="consulta._id">
            <td>{{ consulta.type }}</td>
            <td>{{ consulta.startAt }}</td>
            <td>
              <button
                class="waves-effect btn-small blue darken-1"
                @click="mostrar(consulta)"
              >
                <i class="material-icons">assignment</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Consultation from "./services/consultations";
import FichaPaciente from "./components/FichaPaciente";


export default {
  components: { FichaPaciente },
  data() {
    return {
      consulta: {
        _id: "",
        type: "",
        startAt: "",
      },
      consultapaciente: {
        _id: "",
        type: "",
        active: "",
        patient: "",
      },
      maxlength: "",
      hora: "",
      formulario: true,
      tabela: true,
      dados: false,
      consultations: [],
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true;
      // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },

    mostrar(consulta) {
      this.tabela = false;
      this.formulario = false;
      this.dados = true;
      this.consultapaciente._id = consulta._id;
      this.consultapaciente.type = consulta.type;
      this.consultapaciente.active = true;
    },
    esconder() {
      this.tabela = true;
      this.formulario = true;
      this.dados = false;
    },
    listar() {
      Consultation.listar()
        .then((resposta) => {
          this.consultations = resposta.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    callMethod(data) {
      this.consultapaciente.patient = data;

      Consultation.atualizar(this.consultapaciente)
        .then(() => {
          this.listar();
        })
        .catch((e) => {
          console.log(e);
        });
      this.consultapaciente = {};
    },

    salvar() {
      this.consulta.startAt += "T" + this.hora;
      Consultation.salvar(this.consulta)
        .then(() => {
          this.listar();
        })
        .catch((e) => {
          console.log(e);
        });
      this.consulta = {};
      this.hora = "";
    },
  },
};
</script>


<style>
</style>
