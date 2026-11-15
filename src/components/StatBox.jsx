export function StatBox({ label, value, icon: Icon, iconClass = 'text-oro' }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-lg border border-texto/10 bg-profundo px-3 py-2">
      <span className="text-xs text-suave">{label}</span>
      <span className="inline-flex items-center gap-1.5 text-base font-bold">
        {Icon && <Icon size={15} className={iconClass} aria-hidden="true" />}
        {value}
      </span>
    </div>
  );
}