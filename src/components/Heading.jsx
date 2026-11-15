export function SectionHeader({ kicker, title, description }) {
  return (
    <div className="mb-6">
      <span className="mb-1 block text-xs font-bold tracking-[0.12em] text-oro">{kicker}</span>
      <h2 className="mb-1 font-titulo text-2xl font-bold tracking-wide">{title}</h2>
      <p className="text-sm text-suave">{description}</p>
    </div>
  );
}

export function SubTitle({ as: Tag = 'h4', children }) {
  return (
    <Tag className="mb-2.5 mt-5 text-xs font-bold tracking-widest text-oro">{children}</Tag>
  );
}