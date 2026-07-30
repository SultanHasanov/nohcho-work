import { delay } from '@/api/mock/delay';
import { currentUser } from '@/api/mock/fixtures/users';
import type { Role, Session, User } from '@/api/types';

const PHONE_CODE = '0000';

/** Живёт только в памяти мока: бэкенда и хранилища сессии пока нет. */
let session: Session | null = null;

function makeSession(method: Session['method'], phone: string | null): Session {
  return {
    method,
    user: { ...currentUser, role: null, phone: phone ?? currentUser.phone },
  };
}

export async function loginWithTelegram(): Promise<Session> {
  await delay();
  session = makeSession('telegram', null);
  return session;
}

export async function requestPhoneCode(phone: string): Promise<void> {
  await delay();
  if (phone.replace(/\D/g, '').length < 11) {
    throw new Error('Проверьте номер телефона.');
  }
}

export async function confirmPhoneCode(phone: string, code: string): Promise<Session> {
  await delay();
  if (code !== PHONE_CODE) {
    throw new Error('Код не подходит. Попробуйте ещё раз.');
  }
  session = makeSession('phone', phone);
  return session;
}

export async function getMe(): Promise<User | null> {
  await delay();
  return session ? session.user : null;
}

export async function setRole(role: Role): Promise<User> {
  await delay();
  if (!session) {
    throw new Error('Сессия не найдена. Войдите заново.');
  }
  session = { ...session, user: { ...session.user, role } };
  return session.user;
}

export async function setAvailability(isAvailable: boolean): Promise<User> {
  await delay();
  if (!session) {
    throw new Error('Сессия не найдена. Войдите заново.');
  }
  session = { ...session, user: { ...session.user, isAvailable } };
  return session.user;
}

export async function logout(): Promise<void> {
  await delay();
  session = null;
}
