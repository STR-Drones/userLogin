import { connectMongoDB } from "@/lib/mongodb"; //
import User from "@/models/user";
//Ocultamos cuando no usamos Client
import Client from "@/models/client";
import { NextResponse } from "next/server";

// Esta función se activa cuando registramos un correo ya existente
// Cuando lo hace también aparece la variable client que es la que queremos utilizar
// Se llama solo desde req cuando alguien escribe el correo adecuado

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("email");
    //const user = await Client.findOne({ email }).select("_id");
    console.log("Usuario logeado correctamente, leemos los datos de user: ", user);
    console.log("Leemos los datos req.json", req.json);
    //HAcemos la consulta a la BBDD con el email y seleccionamos
    const client = await Client.findOne({ 'client_contact': email }) //.select("admin");
    console.log("Cliente Bienvenido y mostramos los datos del que ya existe", client);
    return NextResponse.json({ user, client, message: "User created"});
  } catch (error) {
    console.log(error);
  }
}

