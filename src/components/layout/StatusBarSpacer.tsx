/** Отступ под системный статус-бар. Сам статус-бар рисует ОС, не приложение. */
export function StatusBarSpacer() {
  return <div className="h-statusbar shrink-0 pt-safe" aria-hidden="true" />;
}
