import { useState } from 'react';
import { Dices } from 'lucide-react';
import { SectionHeader, SubTitle } from '../components/Heading';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100];

function getFeedback(lastRoll) {
  if (!lastRoll) return { text: 'Listo para lanzar', color: 'text-suave' };
  if (lastRoll.die === 20 && lastRoll.value === 20) {
    return { text: 'CRÍTICO NATURAL', color: 'text-hechizo' };
  }
  if (lastRoll.die === 20 && lastRoll.value === 1) {
    return { text: 'PIFIA CRÍTICA', color: 'text-peligro' };
  }
  return { text: `Resultado en 1d${lastRoll.die}`, color: 'text-suave' };
}

export function DiceTray() {
  const [selectedDie, setSelectedDie] = useState(20);
  const [lastRoll, setLastRoll] = useState(null);
  const [rollKey, setRollKey] = useState(0);
  const [history, setHistory] = useState([]);

  const handleRoll = () => {
    const result = Math.floor(Math.random() * selectedDie) + 1;
    const newEntry = { id: Date.now(), die: selectedDie, value: result };

    setLastRoll(newEntry);
    setRollKey((prev) => prev + 1);
    setHistory((prev) => [newEntry, ...prev].slice(0, 8));
  };

  const feedback = getFeedback(lastRoll);

  return (
    <section>
      <SectionHeader
        kicker="AZAR ARCANO"
        title="LANZADOR DE DADOS"
        description="Selecciona un dado poliédrico y realiza tiradas en tiempo real."
      />

      <Card className="mx-auto flex max-w-lg flex-col gap-5 p-5">
        <div className="flex flex-wrap gap-2">
          {DICE_TYPES.map((sides) => (
            <button
              key={sides}
              type="button"
              onClick={() => setSelectedDie(sides)}
              aria-pressed={selectedDie === sides}
              className={`min-h-11 flex-1 basis-14 cursor-pointer rounded-lg border px-2 text-sm font-bold transition-colors ${
                selectedDie === sides
                  ? 'border-oro bg-oro/10 text-oro'
                  : 'border-texto/10 bg-profundo text-suave hover:border-oro/55 hover:text-texto'
              }`}
            >
              d{sides}
            </button>
          ))}
        </div>

        <div
          key={rollKey}
          aria-live="polite"
          className="flex animate-pop flex-col items-center justify-center rounded-xl border border-oro/55 bg-profundo px-4 py-7 text-center"
        >
          <span className="mb-1 text-sm text-suave">
            Tirada 1d{lastRoll ? lastRoll.die : selectedDie}
          </span>
          <span className="my-1 font-titulo text-6xl font-extrabold leading-none text-hechizo">
            {lastRoll ? lastRoll.value : '?'}
          </span>
          <span className={`mt-2 text-sm font-bold tracking-wider ${feedback.color}`}>
            {feedback.text}
          </span>
        </div>

        <Button className="w-full py-3.5 text-base" onClick={handleRoll}>
          <Dices size={18} aria-hidden="true" />
          <span>Tirar dado d{selectedDie}</span>
        </Button>
      </Card>

      {history.length > 0 && (
        <div className="mx-auto mt-5 max-w-lg">
          <SubTitle>ÚLTIMOS LANZAMIENTOS</SubTitle>
          <div className="flex flex-wrap gap-2">
            {history.map((item) => (
              <span
                key={item.id}
                className="rounded-md border border-texto/10 bg-superficie px-3 py-1.5 text-sm text-suave"
              >
                <strong className="text-oro">d{item.die}:</strong> {item.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}