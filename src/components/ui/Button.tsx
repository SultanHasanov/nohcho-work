import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'primaryTall' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  children: ReactNode;
}

const base =
  'flex w-full items-center justify-center gap-2.5 rounded-btn text-body font-semibold transition-colors disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'h-cta bg-accent text-text active:bg-accent-pressed',
  primaryTall: 'h-cta-tall bg-accent text-text active:bg-accent-pressed',
  secondary: 'h-cta border border-line bg-transparent text-text active:bg-surface',
};

export function Button({
  variant = 'primary',
  isLoading = false,
  disabled,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled ?? isLoading}
      className={[base, variants[variant], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

function Spinner() {
  return (
    <span
      aria-label="Загрузка"
      role="status"
      className="size-5 animate-spin rounded-pill border-2 border-text/30 border-t-text"
    />
  );
}
