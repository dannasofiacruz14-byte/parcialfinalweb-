const VARIANTS = {
  primary: 'bg-boton text-white border-boton hover:bg-boton-hover',
  outline: 'bg-transparent text-oro border-oro/55 hover:bg-oro/10',
  secondary: 'bg-profundo text-texto border-texto/10 hover:border-oro hover:text-oro',
};

export function Button({ variant = 'primary', className = '', type = 'button', children, ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}