"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CriarRacha() {
  const router = useRouter();
  const [racha, setRacha] = useState({
    nome: '',
    horario: '',
    data: '',
    numTimes: 4,
    jogadoresPorTime: 5,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    sessionStorage.setItem('racha', JSON.stringify(racha));
    router.push('/definir-potes');
  };

  return (
    <form style={{ maxWidth: '400px', margin: '50px auto' }} onSubmit={handleSubmit}>
      <h1>Criar Racha</h1>
      {/* <label>
        Nome:
        <input 
          type="text" 
          value={racha.nome} 
          onChange={(e) => setRacha({ ...racha, nome: e.target.value })} 
          required
        />
      </label>
      <br></br>
      <label>
        Horário:
        <input 
          type="time" 
          value={racha.horario} 
          onChange={(e) => setRacha({ ...racha, horario: e.target.value })} 
          required
        />
      </label>
      <br></br>
      <label>
        Data:
        <input 
          type="date" 
          value={racha.data} 
          onChange={(e) => setRacha({ ...racha, data: e.target.value })} 
          required
        />
      </label>
      <br></br> */}
      <label>
        Número de Times:
        <input 
          type="number" 
          value={racha.numTimes} 
          onChange={(e) => setRacha({ ...racha, numTimes: Number(e.target.value) })} 
          min="2"
          required
        />
      </label>
      <br></br>
      <label>
        Jogadores por Time:
        <input 
          type="number" 
          value={racha.jogadoresPorTime} 
          onChange={(e) => setRacha({ ...racha, jogadoresPorTime: Number(e.target.value) })} 
          min="1"
          required
        />
      </label>
      <button type="submit">Definir Potes</button>
    </form>
  );
}