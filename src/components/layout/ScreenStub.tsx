interface ScreenStubProps {
  title: string;
  /** Номер фрейма прототипа, если экран уже нарисован. */
  frame?: string;
}

/** Заглушка экрана: собираем такие по одному за заход. */
export function ScreenStub({ title, frame }: ScreenStubProps) {
  return (
    <section className="flex flex-1 flex-col gap-2 px-gutter py-5">
      <h1 className="text-screen-title font-bold text-text">{title}</h1>
      <p className="text-caption font-medium text-second">Экран в работе.</p>
      {frame ? (
        <p className="font-mono text-meta text-muted">{frame}</p>
      ) : (
        <p className="font-mono text-meta text-muted">В прототипе пока не нарисован</p>
      )}
    </section>
  );
}
