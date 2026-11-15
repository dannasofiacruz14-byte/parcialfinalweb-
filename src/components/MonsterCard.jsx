import { Shield, Heart } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { StatBox } from './StatBox';
import { Button } from './Button';

export function MonsterCard({ monster, onSelect }) {
  const armorClass = Array.isArray(monster.armor_class)
    ? monster.armor_class[0]?.value
    : monster.armor_class;

  return (
    <Card
      as="article"
      onClick={() => onSelect(monster)}
      className="group cursor-pointer transition hover:-translate-y-0.5 hover:border-oro/55"
    >
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="font-titulo text-[1.05rem] font-bold">{monster.name}</h3>
        <Badge variant="gold">CR {monster.challenge_rating}</Badge>
      </div>

      <p className="mb-3.5 text-sm capitalize text-suave">
        {monster.size} • {monster.type}
      </p>

      <div className="grid grid-cols-2 gap-2">
        <StatBox label="Clase Armadura (AC)" icon={Shield} value={armorClass ?? 'N/A'} />
        <StatBox
          label="Puntos de Golpe (HP)"
          icon={Heart}
          iconClass="text-hechizo"
          value={monster.hit_points}
        />
      </div>

      <Button
        variant="secondary"
        className="mt-3.5 w-full group-hover:border-oro group-hover:text-oro"
      >
        Ver ficha completa
      </Button>
    </Card>
  );
}