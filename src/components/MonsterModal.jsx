import { useEffect } from 'react';
import { Shield, Heart, Swords, Wind, X } from 'lucide-react';
import { StatBox } from './StatBox';
import { SubTitle } from './Heading';

const ABILITIES = [
  ['FUE', 'strength'],
  ['DES', 'dexterity'],
  ['CON', 'constitution'],
  ['INT', 'intelligence'],
  ['SAB', 'wisdom'],
  ['CAR', 'charisma'],
];

function TraitList({ title, traits }) {
  if (!traits?.length) return null;
  return (
    <>
      <SubTitle>{title}</SubTitle>
      <ul className="flex flex-col gap-2.5 text-sm">
        {traits.map((trait, idx) => (
          <li key={idx} className="rounded-lg border-l-2 border-arcano bg-profundo px-3.5 py-3">
            <strong>{trait.name}:</strong> {trait.desc}
          </li>
        ))}
      </ul>
    </>
  );
}

export function MonsterModal({ monster, onClose }) {
  useEffect(() => {
    if (!monster) return;
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [monster, onClose]);

  if (!monster) return null;

  const armorClass = Array.isArray(monster.armor_class)
    ? monster.armor_class[0]?.value
    : monster.armor_class;

  const speeds = monster.speed
    ? Object.entries(monster.speed)
        .map(([key, val]) => `${key}: ${val}`)
        .join(', ')
    : 'N/A';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0812]/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={monster.name}
        className="max-h-[85vh] w-full max-w-155 overflow-y-auto rounded-2xl border border-oro/55 bg-superficie p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between border-b border-texto/10 pb-3">
          <div>
            <h2 className="font-titulo text-2xl font-bold text-oro">{monster.name}</h2>
            <p className="text-sm capitalize text-suave">
              {monster.size} {monster.type} ({monster.alignment})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-texto/10 bg-profundo hover:border-oro"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <StatBox
            label="Nivel Desafío (CR)"
            icon={Swords}
            value={`${monster.challenge_rating} (${monster.xp} XP)`}
          />
          <StatBox label="Clase Armadura (AC)" icon={Shield} value={armorClass ?? 'N/A'} />
          <StatBox
            label="Puntos de Golpe (HP)"
            icon={Heart}
            iconClass="text-hechizo"
            value={`${monster.hit_points} (${monster.hit_dice})`}
          />
          <StatBox label="Velocidad" icon={Wind} value={speeds} />
        </div>

        <SubTitle>ATRIBUTOS</SubTitle>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {ABILITIES.map(([label, key]) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-lg border border-texto/10 bg-profundo p-2"
            >
              <span className="text-xs font-semibold text-suave">{label}</span>
              <strong className="text-lg text-hechizo">{monster[key]}</strong>
            </div>
          ))}
        </div>

        <TraitList title="HABILIDADES ESPECIALES" traits={monster.special_abilities} />
        <TraitList title="ACCIONES" traits={monster.actions} />
      </div>
    </div>
  );
}