import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getMonstersList, getMonsterDetail } from '../services/dndApi';
import { MonsterCard } from '../components/MonsterCard';
import { MonsterModal } from '../components/MonsterModal';
import { SectionHeader } from '../components/Heading';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Bestiary() {
  const [allMonsters, setAllMonsters] = useState([]);
  const [displayedMonsters, setDisplayedMonsters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonster, setSelectedMonster] = useState(null);

  useEffect(() => {
    const fetchInitialList = async () => {
      try {
        setLoading(true);
        const list = await getMonstersList();
        setAllMonsters(list);
      } catch {
        setError('No se pudo conectar con la API de D&D 5e.');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialList();
  }, []);

  useEffect(() => {
    if (allMonsters.length === 0) return;

    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const filtered = allMonsters.filter((m) =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const slice = filtered.slice(0, visibleCount);
        const details = await Promise.all(slice.map((m) => getMonsterDetail(m.index)));
        setDisplayedMonsters(details);
      } catch {
        setError('Error cargando las estadísticas de los enemigos.');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadDetails, 300);
    return () => clearTimeout(timer);
  }, [allMonsters, searchTerm, visibleCount]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(12);
  };

  const totalFiltered = allMonsters.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).length;

  return (
    <section>
      <SectionHeader
        kicker="COMPENDIO DE CRIATURAS"
        title="BESTIARIO DE D&D 5E"
        description="Consulta enemigos, puntos de golpe y nivel de desafío en tiempo real."
      />

      <div className="relative mb-6">
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-suave"
        />
        <Input
          type="text"
          placeholder="Buscar monstruo (ej. Dragon, Goblin, Beholder)..."
          aria-label="Buscar monstruo"
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-11"
        />
      </div>

      {error && <p className="px-4 py-10 text-center text-peligro">{error}</p>}

      {loading && displayedMonsters.length === 0 ? (
        <p className="px-4 py-10 text-center text-suave">Invocando criaturas del bestiario...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedMonsters.map((monster) => (
              <MonsterCard key={monster.index} monster={monster} onSelect={setSelectedMonster} />
            ))}
          </div>

          {!loading && displayedMonsters.length === 0 && (
            <p className="px-4 py-10 text-center text-suave">
              No se encontraron enemigos con "{searchTerm}".
            </p>
          )}

          {visibleCount < totalFiltered && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setVisibleCount((prev) => prev + 12)}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Cargar más monstruos'}
              </Button>
            </div>
          )}
        </>
      )}

      <MonsterModal monster={selectedMonster} onClose={() => setSelectedMonster(null)} />
    </section>
  );
}