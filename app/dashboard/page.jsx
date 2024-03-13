import UserInfo from "@/components/UserInfo"; // Import the UserInfo.jsx file from  components which contains the Active Users and DB connection
// Pasar client como una prop desde el componente padre
//import { useState, useEffect } from 'react';
//import { useSession } from "next-auth/react";
//import Client from "@/models/client";
//import UserInfo from "@/components/UserInfo";


export default function Dashboard() {
  // Creates a component for the user information UserInfo.jsx
  // Se puede importar el componente ClientInfo
  return (
  <>
  <UserInfo/>; 
   
  </>
  );
}
