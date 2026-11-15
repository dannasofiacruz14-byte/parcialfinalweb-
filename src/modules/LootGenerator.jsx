import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { getEquipmentList, getMagicItemsList, getItemDetail } from '../services/dndApi';
import { SectionHeader, SubTitle } from '../components/Heading';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ItemCard } from '../components/ItemCard';

const CR_PRESETS = [1, 5, 11, 18];

const COINS = [
  { key: 'cp', label: 'Cobre (CP)', color: 'text-amber-600' },
  { key: 'sp', label: 'Plata (SP)', color: 'text-slate-300' },
  { key: 'gp', label: 'Oro (GP)', color: 'text-oro' },
  { key: 'pp', label: 'Platino (PP)', color: 'text-hechizo' },
];

const rollRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

function generateCoins(level) {
  if (level <= 4) {
    return {
      cp: rollRange(20, 100) * (level + 1),
      sp: rollRange(10, 50) * (level + 1),
      gp: rollRange(2, 15) * (level + 1),
      pp: 0,
    };
  }
  if (level <= 10) {
    return {
      cp: 0,
      sp: rollRange(50, 200),
      gp: rollRange(30, 120) * level,
      pp: rollRange(1, 10) * Math.floor(level / 2),
    };
  }
  if (level <= 16) {
    return { cp: 0, sp: 0, gp: rollRange(200, 600) * level, pp: rollRange(20, 80) * level };
  }
  return { cp: 0, sp: 0, gp: rollRange(1000, 3000) * level, pp: rollRange(100, 400) * level };
}

export function LootGenerator() {
  const [cr, setCr] = useState(3);
  const [loot, setLoot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLoot = async () => {
    setLoading(true);
    setError(null);

    try {
      const level = Math.max(0, Math.min(30, Number(cr) || 0));
      const coins = generateCoins(level);

      const [equipmentList, magicList] = await Promise.all([
        getEquipmentList(),
        level >= 3 ? getMagicItemsList() : Promise.resolve([]),
      ]);

      const selectedUrls = [];

      const eqCount = level <= 4 ? rollRange(1, 2) : 1;
      for (let i = 0; i < eqCount; i++) {
        const randomEq = pickRandom(equipmentList);
        if (randomEq && !selectedUrls.includes(randomEq.url)) selectedUrls.push(randomEq.url);
      }

      if (level >= 3 && magicList.length > 0) {
        const magicCount = level <= 8 ? 1 : level <= 15 ? 2 : 3;
        for (let i = 0; i < magicCount; i++) {
          const randomMagic = pickRandom(magicList);
          if (randomMagic && !selectedUrls.includes(randomMagic.url)) {
            selectedUrls.push(randomMagic.url);
          }
        }
      }

      const items = await Promise.all(selectedUrls.map((url) => getItemDetail(url)));
      setLoot({ cr: level, coins, items });
    } catch {
      setError('No se pudo generar el botín. Verifica tu conexión a internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <SectionHeader
        kicker="TESOROS Y RELIQUIAS"
        title="GENERADOR DE BOTÍN"
        description="Calcula monedas y objetos reales de D&D 5e según el Nivel de Desafío derrotado."
      />

      <Card className="mb-6">
        <label htmlFor="cr-input" className="mb-2 block text-sm font-semibold">
          Nivel de Desafío (CR) del monstruo (0 – 30)
        </label>

        <div className="flex flex-wrap gap-3">
          <Input
            id="cr-input"
            type="number"
            min="0"
            max="30"
            step="1"
            value={cr}
            onChange={(e) => setCr(e.target.value)}
            className="max-w-28 bg-profundo text-center font-bold"
          />
          <Button onClick={generateLoot} disabled={loading}>
            <Sparkles size={17} aria-hidden="true" />
            <span>{loading ? 'Generando tesoro...' : 'Generar Recompensa'}</span>
          </Button>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2">
          {CR_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setCr(preset)}
              className={`min-h-9 cursor-pointer rounded-md border bg-profundo px-3 text-xs font-semibold transition-colors hover:border-oro hover:text-oro ${
                Number(cr) === preset ? 'border-oro text-oro' : 'border-texto/10 text-suave'
              }`}
            >
              CR {preset}
            </button>
          ))}
        </div>
      </Card>

      {error && <p className="px-4 py-10 text-center text-peligro">{error}</p>}

      {loot && (
        <div>
          <SubTitle as="h3">TESORO OBTENIDO (CR {loot.cr})</SubTitle>

          <div className="mb-5 mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
            {COINS.map(({ key, label, color }) => (
              <Card key={key} className="flex flex-col p-3.5">
                <span className="text-xs text-suave">{label}</span>
                <strong className={`mt-0.5 text-2xl ${color}`}>
                  {loot.coins[key].toLocaleString()}
                </strong>
              </Card>
            ))}
          </div>

          <SubTitle>OBJETOS ENCONTRADOS</SubTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loot.items.map((item) => (
              <ItemCard key={item.index} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}