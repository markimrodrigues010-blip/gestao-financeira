import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom"; // 💡 ADICIONEI ESTA LINHA

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
        
        {/* 💡 ADICIONEI ESTA SEÇÃO PARA O LINK */}
        <p style={{marginTop: 15}}>
            Não tem conta? <Link to="/register" style={{color:'var(--primary)', textDecoration: 'none'}}>Criar uma agora!</Link>
        </p>
      </div>
    </div>
  );
}
