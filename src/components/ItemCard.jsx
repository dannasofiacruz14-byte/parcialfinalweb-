import { Card } from './Card';
import { Badge } from './Badge';

export function ItemCard({ item }) {
  const isMagic = Boolean(item.rarity);

  return (
    <Card as="article" className={isMagic ? 'border-hechizo/45' : ''}>
      <div className="mb-1 flex items-start justify-between gap-2">
        <h4 className="font-titulo text-base font-bold">{item.name}</h4>
        <Badge variant={isMagic ? 'teal' : 'violet'}>
          {isMagic ? item.rarity.name : item.equipment_category?.name || 'Equipo'}
        </Badge>
      </div>

      {item.cost && (
        <p className="mb-1.5 text-sm font-semibold text-oro">
          Valor: {item.cost.quantity} {item.cost.unit}
        </p>
      )}

      <p className="text-sm text-suave">
        {Array.isArray(item.desc) && item.desc.length > 0
          ? item.desc[0]
          : 'Objeto estándar de aventura listo para equipar.'}
      </p>
    </Card>
  );
}