import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './Login.css';
import firebaseApp from './App.js'; // Assumindo que o arquivo app.js está no mesmo diretório que login.js


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Estado para armazenar o usuário autenticado
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user); // Atualiza o estado do usuário autenticado
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página
    
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate('/adm');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setError(error.message); // Atualiza o estado de erro com a mensagem de erro
    }
  };
  

  // Se o usuário estiver autenticado, redirecione para /adm automaticamente
  if (user) {
    navigate('/adm');
    return null;
  }

  return (
    <div className='row'>
      <h2>Login</h2>
      <form className='' onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>} {/* Exibe a mensagem de erro, se houver */}
    </div>
  );
}

export default Login;
