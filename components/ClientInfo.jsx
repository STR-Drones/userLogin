"use client";

import { connectMongoDB } from "@/lib/mongodb";
import { useSession } from "next-auth/react"; // import the useSession data

export default function ClientInfo({ client }) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          <span className="font-bold">Nombre del cliente: </span>{client?.client_name}
        </div>
        <div>
          <span className="font-bold">Email del cliente: </span>{client?.client_contact}
        </div>
        <div>
          <span className="font-bold">Proyectos del cliente: </span>{client?.project_id?.join(", ")}
        </div>
      </div>
    </div>
  );
}
