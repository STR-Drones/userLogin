import mongoose from "mongoose";

// Funciónde connectMongoDB, conecta a la BBDD que tiene el registro de códigos de cliente y usuarios
// Permite dar los códigos de error para el cluster utilizado

export const connectMongoDB = async () => { // Make the connection to MongoDB by using a try ad catch block
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Pass the connection string that we have for the database connection in .env file
    console.log("Connected to MongoDB"); 
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

//Función de MongoDB que conecta al cluster que contiene los datos del proyecto
// MONGODB_PROJECT_URI se define en un fichero .env y es el string de conexión a ese cluster en producción
export const connectClusterDB = async () => { // Make the connection to MongoDB by using a try ad catch block
  try {
    await mongoose.connect(process.env.MONGODB_PROJECT_URI); // Pass the connection string that we have for the database connection in .env file
    console.log("Connected to Cluster in MongoDB"); 
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};