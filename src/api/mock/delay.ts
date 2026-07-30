const MIN_DELAY = 300;
const MAX_DELAY = 600;

function readFailRate(): number {
  const raw = Number.parseFloat(import.meta.env.VITE_API_FAIL_RATE ?? '0');
  if (Number.isNaN(raw)) return 0;
  return Math.min(Math.max(raw, 0), 1);
}

let failRate = readFailRate();

/** Переключатель имитации ошибки — им пользуемся при проверке состояний. */
export function setMockFailRate(rate: number): void {
  failRate = Math.min(Math.max(rate, 0), 1);
}

export class ApiError extends Error {
  constructor(message = 'Не удалось загрузить данные. Проверьте соединение.') {
    super(message);
    this.name = 'ApiError';
  }
}

/** Задержка 300–600 мс и, если включена имитация, ошибка вместо ответа. */
export async function delay(): Promise<void> {
  const ms = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
  await new Promise((resolve) => setTimeout(resolve, ms));
  if (failRate > 0 && Math.random() < failRate) {
    throw new ApiError();
  }
}
