import { useState, useEffect } from 'react';

export default function SorteandoTimes({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextValue = prev + 1;
        if (nextValue > 100) {
          clearInterval(interval);
          onComplete(); // Chama a função de callback quando o carregamento termina
        }
        return nextValue;
      });
    }, 20); // 20ms * 100 = 2000ms (2 segundos)

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Sorteando times...</h2>
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '10px',
          background: '#e0e0e0',
          borderRadius: '5px',
          margin: '20px auto',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: '#4caf50',
            transition: 'width 0.03s linear',
          }}
        />
      </div>
    </div>
  );
}
