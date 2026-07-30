import { formatPrice } from '@/lib/format';

/**
 * Блок баланса из фрейма 13. Расчёт наличными вне платформы, поэтому
 * «Вывести» пока ни к чему не ведёт — экрана вывода в макете нет.
 */
export function WalletCard({ balance }: { balance: number }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-card border border-line bg-surface px-card py-2.75">
      <div className="flex flex-col gap-1">
        <span className="text-meta font-bold tracking-wide text-second uppercase">
          Кошелёк
        </span>
        <span className="text-logo-sm font-extrabold text-text">
          {formatPrice(balance)}
        </span>
      </div>
      <button
        type="button"
        disabled
        className="h-control shrink-0 rounded-btn bg-accent px-5 text-lead font-semibold text-text active:bg-accent-pressed disabled:opacity-60"
      >
        Вывести
      </button>
    </div>
  );
}
