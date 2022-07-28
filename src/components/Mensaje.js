import { Alert, Platform } from "react-native";
const Mensaje = (datos) =>{
	Alert.alert(datos.titulo, datos.msj);


}
export default Mensaje;