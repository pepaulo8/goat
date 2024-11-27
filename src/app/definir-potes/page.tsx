"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DefinirPotes() {
  const router = useRouter();
  const [racha, setRacha] = useState(null);
  const [potes, setPotes] = useState<{pote: number, jogadores: []}[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jogadores, setJogadores] = useState<any[]>([]);

  useEffect(() => {
    const rachaData = JSON.parse(sessionStorage.getItem('racha') as string);
    if (!rachaData) {
      router.push('/criar-racha');
      return;
    }
    setRacha(rachaData);
    const numPotes = rachaData.jogadoresPorTime;
    setPotes(Array.from({ length: numPotes }, (_, i) => ({ pote: i + 1, jogadores: [] })));
    setJogadores(
      Array.from({ length: numPotes * rachaData.numTimes }, (_, i) => ({
        id: i + 1,
        name: '',
        pote: Math.floor(i / rachaData.numTimes) + 1,
      }))
    );
  }, [router]);

  const handleChange = (id, value) => {
    setJogadores((prev) =>
      prev.map((jogador) => (jogador.id === id ? { ...jogador, name: value } : jogador))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const groupedPotes = potes.map((pote) => ({
      pote: pote.pote,
      jogadores: jogadores
        .filter((jogador) => jogador.pote === pote.pote)
        .map((jogador) => jogador.name),
    }));
    sessionStorage.setItem('potes', JSON.stringify(groupedPotes));
    router.push('/times');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h1>Definir Potes</h1>
      {potes.map((pote, poteIndex) => (
        <div key={pote.pote} style={{ marginBottom: '20px' }}>
          <h3>{poteIndex + 1 === potes.length ? 'Goleiros' : `Pote ${pote.pote}`}</h3>
          {jogadores
            .filter((jogador) => jogador.pote === pote.pote)
            .map((jogador) => (
              <div key={jogador.id} style={{ marginBottom: '10px' }}>
                <label>
                  Jogador {jogador.id}:
                  <input
                    type="text"
                    value={jogador.name}
                    onChange={(e) => handleChange(jogador.id, e.target.value)}
                    required
                  />
                </label>
              </div>
            ))}
        </div>
      ))}
      <button type="submit" style={{ marginTop: '20px' }}>
        Sortear Times
      </button>
    </form>
  );
}
