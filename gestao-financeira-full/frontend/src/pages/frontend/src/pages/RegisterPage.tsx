import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom"; // Necessário para o link de 'Fazer Login'

export default function RegisterPage(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function registerUser(){
    // Limpa qualquer mensagem de erro anterior
    setMessage(""); 
    
    try {
        // Envia os dados para a nova rota /api/auth/register
        const r = await api.post("/auth/register", { name, email, password });
        
        setMessage("Conta criada com sucesso! Redirecionando para o Dashboard...");
        
        // Salva o token retornado e redireciona (lógica igual à do login)
        localStorage.setItem("token", r.data.token); 
        
        setTimeout(() => {
            window.location.href="/dashboard";
        }, 1500); // Espera 1.5s antes de redirecionar

    } catch (error: any) {
        // Captura a mensagem de erro do servidor, se disponível
        const errorMessage = error.response?.data?.message || "Erro ao criar conta. Tente novamente.";
        setMessage(errorMessage);
        console.error(error);
    }
  }

  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:100}}>
      <div style={{padding:30,background:"#111",borderRadius:10,width:300}}>
        <h2>Criar Conta</h2>
        
        {/* Exibe mensagem de sucesso ou erro */}
        {message && <p style={{color:'var(--primary)'}}>{message}</p>}
        
        {/* Campo Nome */}
        <input 
          placeholder="Nome" 
          onChange={e=>setName(e.target.value)} 
          style={{width:'100%', padding: '8px 10px', boxSizing: 'border-box'}}
        />
        <br/><br/>
        
        {/* Campo Email */}
        <input 
          placeholder="Email" 
          onChange={e=>setEmail(e.target.value)} 
          style={{width:'100%', padding: '8px 10px', boxSizing: 'border-box'}}
        />
        <br/><br/>
        
        {/* Campo Senha */}
        <input 
          placeholder="Senha" 
          type="password" 
          onChange={e=>setPassword(e.target.value)} 
          style={{width:'100%', padding: '8px 10px', boxSizing: 'border-box'}}
        />
        <br/><br/>
        
        <button onClick={registerUser}>Registrar</button>
        
        {/* Link para voltar ao Login */}
        <p style={{marginTop: 15, fontSize: '0.9em'}}>
            Já tem conta? <Link to="/" style={{color:'var(--primary)', textDecoration: 'none'}}>Fazer Login</Link>
        </p>
      </div>
    </div>
  );
}
