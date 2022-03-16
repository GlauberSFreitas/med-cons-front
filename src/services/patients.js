import { http } from './config'



export default	{
	salvar:(patient)=>{
		return http.post('patients',patient);
  },
  
}

