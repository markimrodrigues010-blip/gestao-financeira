
import { useState } from "react";
import api from "../api";

export default function LoginPage(){
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  async function login(){
    const r=await api.post("/auth/login",{email,password});
    localStorage.setItem("token",r.data.token);
    window.location.href="/dashboard";
  }

  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:100}}>
      <div style={{padding:30,background:"#111",borderRadius:10,width:300}}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <br/><br/>
        <input placeholder="Senha" type="password" onChange={e=>setPassword(e.target.value)} />
        <br/><br/>
        <button onClick={login}>Entrar</button>
      </div>
    </div>
  );
}
