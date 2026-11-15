import { useState } from 'react';
import { Hexagon, Skull, Gem, Dices } from 'lucide-react';
import { Bestiary } from './modules/Bestiary';
import { LootGenerator } from './modules/LootGenerator';
import { DiceTray } from './modules/DiceTray';

const TABS = [
  { id: 'bestiary', label: 'Bestiario', icon: Skull, view: Bestiary },
  { id: 'loot', label: 'Botín', icon: Gem, view: LootGenerator },
  { id: 'dice', label: 'Dados', icon: Dices, view: DiceTray },
];

export function App() {
  const [activeTab, setActiveTab] = useState('bestiary');
  const ActiveView = TABS.find((tab) => tab.id === activeTab).view;

  return (
    <div className="flex min-h-screen flex-col pb-[calc(76px+env(safe-area-inset-bottom))] md:pb-10">
      <header className="sticky top-0 z-20 border-b border-texto/10 bg-fondo pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2.5 text-oro">
            <Hexagon size={22} aria-hidden="true" />
            <h1 className="font-titulo text-lg font-bold tracking-wider">GRIMORIO DEL DM</h1>
          </div>

          <nav
            aria-label="Secciones"
            className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 gap-1.5 border-t border-texto/10 bg-superficie px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:static md:flex md:gap-2 md:border-0 md:bg-transparent md:p-0"
          >
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                aria-current={activeTab === id ? 'page' : undefined}
                className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border px-2 text-sm font-semibold transition-colors md:px-4 ${
                  activeTab === id
                    ? 'border-arcano bg-arcano/15 text-texto'
                    : 'border-transparent text-suave hover:text-texto'
                }`}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-6">
        <ActiveView />
      </main>
    </div>
  );
}

export default App;