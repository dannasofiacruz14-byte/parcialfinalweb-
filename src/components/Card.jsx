// Tarjeta genérica y reutilizable
export function Card({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag
      className={`rounded-xl border border-texto/10 bg-superficie p-4 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}