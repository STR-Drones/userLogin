import { connectMongoDB } from "@/lib/mongodb"; // Importamos nuestra función de conexión a MongoDB
import User from "@/models/user";
//import Client from "@/models/client"; // Si queremos definir nuestro propio  cliente, tenemos que crear el modelo y esquema
import NextAuth from "next-auth/next";
import AppleProvider from "next-auth/providers/apple"
import GoogleProvider from "next-auth/providers/google"

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // library that provides the hash method for our password
import Client from "@/models/client";

export const authOptions = { // Proporcionamos los valores para NextAuth 
  providers: [
    // Add Apple provider if needed
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    // Add Google Provider as company
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers if needed
    CredentialsProvider({
      name: "credentials", // contains the cluster name information
      credentials: {},

      async authorize(credentials) {  //function provided by the CredentialsProvider to authorize users based on the provided credentials. 
        // queryies a MongoDB database to find a user with the provided email and then checking if the password matches using bcrypt for password hashing
        //bcrypt method should be the same for writing and reading
        //const { email, business_id, password } = credentials; // import the input values form the Login page with the business _id
        const { email, password } = credentials;
        try {
          await connectMongoDB(); // DB connection
          //const user = await User.findOne({ email, business_id }); // para iniciar y comunicar en la base de datos buscamos por el correo electronico  y business_id en la BBDD
          const user = await User.findOne({ email }); // buscamos solo el email
          //imprimimos el log de los datos que tiene user y se devuelve
          console.log("user: ", user);
          if (!user) {
            return null;
          }
          
          const passwordsMatch = await bcrypt.compare(password, user.password); // Comprobación de las contraseñas hasheadass al comparar nuestra password con la guardada (ambas hasheadas)

          if (!passwordsMatch) { // check whether the password match or not
            return null; 
          }
          //Almacenamos la constante del email para obtener información
          //const userEmail = user.email;
          const client = await Client.findOne({'client_contact': email }); 
          console.log("client: ", client);
          
          //const userData = await getClientData(userEmail)
          //return user, userData; // if all goes well we return  the user object
          if (!client) {
            return null;
          }
          return user; /*: {
              _id: user._id,
              email: user.email,
              business_id: user.business_id,
              // Otra información de usuario que quieras incluir
            },
            // Devolvemos la información del clientes
            client: {
              client_name: client.client_name,
              project_id: client.project_id,
              admin: client.admin,
              // Información del cliente que quieras incluir
              // por ejemplo: clientName, businessId, etc.
            }
          }; /** */
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // JSON web tokens It determines how sessions are managed and authenticated.
  },
  secret: process.env.NEXTAUTH_SECRET, // Pasamos el valor de  la clave secreta que generamos en .env para encryptar y desencriptar
  pages: {
    
    signIn: "/", // This specifies the pages used for authentication/login. In this case, the signIn option is set to '/', indicating that the root page will be used for sign-in
  },
};

const handler = NextAuth(authOptions);  // Create a variable with the different Authentication options. This handler will be used to handle authentication requests.

export { handler as GET, handler as POST }; //  This exports the handler created above as GET and POST. This allows the handler to be accessed through HTTP GET and POST requests respectively.
