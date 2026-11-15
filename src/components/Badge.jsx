const VARIANTS = {
  gold: 'bg-oro/15 text-oro border-oro/55',
  teal: 'bg-hechizo/15 text-hechizo border-hechizo/45',
  violet: 'bg-arcano/20 text-violet-300 border-arcano/55',
};

export function Badge({ variant = 'gold', children }) {
  return (
    <span
      className={`whitespace-nowrap rounded-md border px-2.5 py-1 text-xs font-bold ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}