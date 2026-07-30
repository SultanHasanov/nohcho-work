interface LogoProps {
  /** Сторона логотипа в пикселях: 76 на экране входа, 30 в шапке. */
  size?: number;
  /** Оставлен для совместимости со старыми местами использования. */
  strokeWidth?: number;
}

/** Основной знак бренда. */
export function Logo({ size = 30 }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      className="shrink-0 object-contain"
      aria-hidden="true"
    />
  );
}

/** Логотип с подписью: «Нохчо Work», слово Work — акцентом. */
export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      Нохчо <span className="text-accent">Work</span>
    </span>
  );
}
