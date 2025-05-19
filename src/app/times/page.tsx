/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SorteandoTimes from "./carregando";

interface Time {
  nome: string;
  jogadores: string[];
}

export default function Times() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [racha, setRacha] = useState<any>(null);
  const [potes, setPotes] = useState<{ pote: number; jogadores: [] }[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Recupera os dados do sessionStorage
    const rachaData = JSON.parse(sessionStorage.getItem("racha") || "{}");
    const potesData = JSON.parse(sessionStorage.getItem("potes") || "[]");

    if (!rachaData || !potesData.length) {
      router.push("/criar-racha");
      return;
    }

    setRacha(rachaData);
    setPotes(potesData);
    sortearTimes(rachaData, potesData);
  }, [router]);

  const sortearTimes = (
    rachaData: any,
    potesData: { pote: number; jogadores: [] }[]
  ) => {
    setIsLoading(true);
    const { numTimes } = rachaData;

    // Inicializa os times
    const timesTemp: Time[] = Array.from({ length: numTimes }, (_, i) => ({
      nome: `Time ${i + 1}`,
      jogadores: [],
    }));

    // Função Fisher-Yates Shuffle para embaralhar
    const fisherYatesShuffle = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    // Percorre cada pote e distribui os jogadores embaralhados
    potesData.forEach(({ jogadores }) => {
      const shuffledPote = [...jogadores];
      fisherYatesShuffle(shuffledPote);

      shuffledPote.forEach((jogador, index) => {
        timesTemp[index % numTimes].jogadores.push(jogador);
      });
    });

    setTimes(timesTemp);
  };

  const handleNovoRacha = () => {
    sessionStorage.removeItem("racha");
    sessionStorage.removeItem("potes");
    router.push("/criar-racha");
  };

  const onComplete = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      {!isLoading ? (
        <>
          <h1>Resultados do Sorteio</h1>
          {times.length > 0 ? (
            times.map((time) => (
              <div key={time.nome} style={{ marginBottom: "20px" }}>
                <h2>{time.nome}</h2>
                <ul>
                  {time.jogadores.map((jogador, index) => (
                    <li key={index}>Jogador: {jogador}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>Carregando times...</p>
          )}
          <button
            onClick={() => sortearTimes(racha, potes)}
            style={{ marginTop: "20px" }}
          >
            Sortear novamente
          </button>
          <br></br>
          <button onClick={handleNovoRacha} style={{ marginTop: "20px" }}>
            Criar Novo Racha
          </button>
        </>
      ) : (
        <SorteandoTimes onComplete={onComplete} />
      )}
    </div>
  );
}
