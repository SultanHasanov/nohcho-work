import { useParams } from 'react-router-dom';

import { ScreenStub } from '@/components/layout/ScreenStub';

const titles: Record<string, string> = {
  terms: 'Условия использования',
  privacy: 'Политика конфиденциальности',
};

export default function LegalPage() {
  const { doc } = useParams();
  return <ScreenStub title={titles[doc ?? ''] ?? 'Документы'} />;
}
