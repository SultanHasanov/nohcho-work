interface AvatarProps {
  name: string;
  /** Класс размера из темы: size-10 в чате, size-18 в профиле. */
  sizeClass: string;
  textClass: string;
  isOnline?: boolean;
}

/** Буквенный аватар из фреймов 12 и 13. Фотографий в макете нет. */
export function Avatar({
  name,
  sizeClass,
  textClass,
  isOnline = false,
}: AvatarProps) {
  const letter = name.trim().charAt(0).toUpperCase();

  return (
    <span className={`relative shrink-0 ${sizeClass}`}>
      <span
        className={`flex size-full items-center justify-center rounded-pill bg-avatar font-bold text-text ${textClass}`}
      >
        {letter}
      </span>
      {isOnline ? (
        <>
          <span className="absolute -right-px -bottom-px size-2.75 rounded-pill border-2 border-bg bg-accent" />
          <span className="absolute -right-px -bottom-px size-2.75 animate-pulse-dot rounded-pill bg-accent" />
        </>
      ) : null}
    </span>
  );
}
