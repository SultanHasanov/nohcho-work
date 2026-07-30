import { useParams } from 'react-router-dom';

import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { TopBar } from '@/components/layout/TopBar';
import { legalDocs } from '@/pages/Legal/content';

/** Фрейм 21: условия использования и политика конфиденциальности. */
export default function LegalPage() {
  const { doc } = useParams();
  const legal = legalDocs[doc ?? ''];

  if (!legal) {
    return (
      <section className="flex flex-1 flex-col">
        <StatusBarSpacer />
        <TopBar title="Документы" />
        <p className="px-gutter pt-2 text-caption font-medium text-second">
          Такого документа нет.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <TopBar title={legal.title} />

      <div className="flex flex-1 flex-col gap-4.5 px-gutter pt-2 pb-6">
        <p className="font-mono text-meta text-muted">Обновлено {legal.updatedAt}</p>

        {legal.sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <h2 className="text-lead font-bold text-text">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-caption leading-relaxed font-medium text-second"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
