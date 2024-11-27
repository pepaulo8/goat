"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bem-vindo ao Organizador de Racha GOAT!</h1>
      <button 
        onClick={() => router.push('/criar-racha')}
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}
      >
        Criar Racha
      </button>
    </div>
  );
}