/** Единый текст ошибки для сторов: показываем его рядом с кнопкой повтора. */
export function toMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Что-то пошло не так.';
}
