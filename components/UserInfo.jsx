"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"; // import the useSession data

export default function UserInfo() {
  const { data: session , status} = useSession(); // rename the session data from useSession
  // this only provides the name and email from nextauth 


  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        
        <div>
          Usuario: <span className="font-bold">{session?.user?.name}</span>
        </div>
       
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span> 
        </div>
        <button
          onClick={() => signOut(
            {
              callbackUrl: "/", // Redirige a la ventana de registro tras salir de la app
              // Tendría sentido redirigir siempre a la principal de login http:localhost:3000
            }
          )}
          className="bg-red-500 bg-opacity-20 border border-red-600 text-red-600 text-RED font-bold rounded-3xl px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
