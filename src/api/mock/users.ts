import { delay } from '@/api/mock/delay';
import { currentUser, peers } from '@/api/mock/fixtures/users';
import type { User } from '@/api/types';

const everyone: User[] = [currentUser, ...peers];

export async function getUser(id: string): Promise<User> {
  await delay();
  const user = everyone.find((item) => item.id === id);
  if (!user) {
    throw new Error('Пользователь не найден.');
  }
  return user;
}
