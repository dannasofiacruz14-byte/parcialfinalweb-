export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-texto/10 bg-superficie px-4 py-3 text-base text-texto placeholder:text-suave focus:border-oro focus:outline-none ${className}`}
      {...props}
    />
  );
}