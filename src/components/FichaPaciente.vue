<template>
  <div class="text-center">
    <form @submit.prevent="salvar" v-if="form">
      <label>Nome</label>
      <input
        type="text"
        placeholder="Nome"
        v-model="patient.name"
        maxlength="30"
        v-on:keypress="isLetter($event)"
      />
      <label>CPF</label>
      <input
        type="text"
        placeholder="CPF"
        v-model="patient.cpf"
        maxlength="11"
        v-on:keypress="isNumber($event)"
      />
      
      
      <label>Nascimento</label>
      <input
        type="date"
        class="datepicker"
        placeholder="Inicio"
        v-model="patient.born"
      />
      <label>Altura</label>
      <input
        type="text"
        placeholder="Altura"
        maxlength="4"
        v-model="patient.height"
        v-on:keypress="isNumber($event)"
      />
      <label>Peso</label>
      <input
        type="text"
        placeholder="Peso"
        maxlength="4"
        v-model="patient.weight"  
        v-on:keypress="isNumber($event)"      
      />
      <label>Pressão</label>
      <input
        type="text"
        placeholder="Pressão"
        maxlength="4"
        v-model="patient.pressure"
        v-on:keypress="isNumber($event)"
      />
      <label>Saturação</label>
      <input
        type="text"
        placeholder="Saturação"
        maxlength="2"
        v-model="patient.saturation"
        v-on:keypress="isNumber($event)"
      />

      <button class="waves-effect waves-light btn-small">
        <i class="material-icons">save</i>
      </button>
      <button
        class="waves-effect btn-small red darken-1"
        @click="this.$parent.esconder()"
      >
        <i class="material-icons">close</i>
      </button>
    </form>
  </div>
</template>


<script>
import Patient from "../services/patients";

export default {
  
  data() {
    return {
      patient: {
        _id: "",
        name: "",
        cpf: "",
        born: "",
        height: "",
        weight: "",
        pressure: "",
        saturation: "",
      },
      dialog: false,
      form: true,
    };
  },

  methods: {
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true;
      // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },
     isNumber(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[0-9.]+$/.test(char)) return true;
      // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },

    salvar() {
      Patient.salvar(this.patient)
        .then((resposta) => {
          this.$parent.callMethod(resposta.data._id);
        })
        .catch((e) => {
          console.log(e);
        });

      this.$parent.esconder();
    
    },
  },
};
</script>

