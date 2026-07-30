/** Два фоновых слоя фрейма 01: диагональная штриховка и зелёный отсвет сверху. */
export function LoginBackdrop() {
  return (
    <>
      <div className="absolute inset-0 opacity-50 bg-hatch" aria-hidden="true" />
      <div className="absolute inset-0 bg-glow" aria-hidden="true" />
    </>
  );
}
