import { http } from './config'



export default	{

	salvar:(consultation)=>{
		return http.post('consultations',consultation);
  },
    
	atualizar:(consultation)=>{
		return http.put('consultations',consultation);
  },

  listar:()=>{
		return http.get('consultations')
  },
    
	apagar:(consultation)=>{
		return http.delete('consultations', { data: consultation })
	}
}