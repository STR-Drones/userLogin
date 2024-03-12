// Definimos la estructura de los clientes dados de alta en nuestra aplicación
// Estos clientes tienen permiso para acceder la app

// Importa mongoose
import mongoose, { Schema, models } from "mongoose";


// Define el esquema para los documentos de la colección clients
const projectSchema = new Schema({
  project_id: {
    type: String,
    required: true
  },
  project_name: {
    type: String,
    required: true
  },
  project_address: {
    type: String,
    required: true
  },
  cluster: { // Debe ir definido como una matriz de objetos
    type: [{
      name: String, //define el nombre del clsuter a conectar
      users: [{
        password: String, //define la contraseña del cluster (development o production)
        username: String //define el usuario del cluster (development o production)
      }]
    }],
    default: []
  }
 
});

const Project = models.Project || mongoose.model("Project", projectSchema); // import the models from moongoose in case they exist
// or creates the user model with the user schema
export default Project;