import { Fragment } from 'react';

import type { User } from '@/api/types';
import { formatShare, formatTenure } from '@/lib/format';

/** Три показателя через разделители — фрейм 13. */
export function StatsRow({ user }: { user: User }) {
  const cells = [
    { value: String(user.doneCount), label: 'Выполнено\nзаказов' },
    { value: formatShare(user.positiveShare), label: 'Положительных\nотзывов' },
    { value: formatTenure(user.monthsOnPlatform), label: 'на\nплатформе' },
  ];

  return (
    <div className="flex items-stretch rounded-card border border-line bg-surface py-2.5">
      {cells.map((cell, index) => (
        <Fragment key={cell.label}>
          {index > 0 ? <span className="w-px shrink-0 bg-line" /> : null}
          <div className="flex flex-1 flex-col items-center gap-1 text-center">
            <span className="text-logo-header font-extrabold text-text">
              {cell.value}
            </span>
            <span className="text-meta leading-tight font-medium whitespace-pre-line text-second">
              {cell.label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
