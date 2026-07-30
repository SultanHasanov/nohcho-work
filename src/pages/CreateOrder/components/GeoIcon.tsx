/** Иконка «определить на карте» из фрейма 06. */
export function GeoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" stroke="var(--color-accent)" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.2" fill="var(--color-accent)" />
      <path
        d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"
        stroke="var(--color-accent)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
