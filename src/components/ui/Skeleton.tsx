interface SkeletonProps {
  /** Класс размера из темы: высота и ширина задаются на месте. */
  className: string;
  /** Статичная плашка без бегущего блика — как нижние строки в фрейме 03b. */
  isStatic?: boolean;
}

export function Skeleton({ className, isStatic = false }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={['block', isStatic ? 'bg-surface-2' : 'skeleton', className].join(' ')}
    />
  );
}
