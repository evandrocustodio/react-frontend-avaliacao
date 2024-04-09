import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './despesas.jpeg';
import './App.css';

type Despesa = {
  id: number;
  nome: string;
  valor: number;
}
type Info = {
  aluno: string;
  hostname: string;
}
const BACKEND_URL = "localhost:8080";

const API_URL = `https://${BACKEND_URL}`;

const App = () => {


  const api = axios.create({
    baseURL: API_URL,
  });

  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [info, setInfo] = useState<Info>();
  const [erros, setErros] = useState<boolean>(false);

  useEffect(() => {
    api
      .get("/despesas")
      .then((a) => {
        setDespesas(a.data);
      })
      .catch((e) => {
        console.log("Não foi possivel carrregar lista de despesas");
        setErros(true);
      });

      api
      .get("/info")
      .then((a) => {
        setInfo(a.data);
      })
      .catch((e) => {
        console.log("Não foi possivel carrregar Informações");
        setErros(true);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <p>DESPESAS DO MÊS </p>

        {erros && <div>Erro de conexão com o backend</div>}
        <div style={{width: '700px'}}>
        {despesas &&<div style={{display:'flex', justifyContent:'space-between', width:'100%', color:'yellow'}}>
                <div>ID</div>
                <div> NOME</div>
                <div> VALOR</div>
              </div>}
        {despesas &&
          despesas.map((a) => (
            <>            
              <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                <div>{a.id.toString().padStart(5,'0')}</div>
                <div > {a.nome}</div>
                <div > {(Math.round(a.valor * 100) / 100).toFixed(2)}</div>
              </div>
            </>
          ))}

          {info && <>
            <div style={{display:'flex', flexDirection:"column-reverse" ,justifyContent:'space-between', width:'100%', marginTop:'50px'}}>
                <div > ALUNO: {info.aluno}</div>
                <div > POD: {info.hostname}</div>
              </div> 
            </>}
          </div>
      </header>
    </div>
  );
}

export default App;

