import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { Role, User } from '@/api/types';
import { toMessage } from '@/lib/errors';

export class SessionStore {
  user: User | null = null;
  /** Роль, выбранная на экране 02, но ещё не подтверждённая кнопкой «Продолжить». */
  pendingRole: Role | null = null;
  isLoading = false;
  isRestoring = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthorized(): boolean {
    return this.user !== null;
  }

  get role(): Role | null {
    return this.user?.role ?? null;
  }

  get hasRole(): boolean {
    return this.role !== null;
  }

  get selectedRole(): Role | null {
    return this.pendingRole ?? this.role;
  }

  /** Восстановление сессии при старте приложения. */
  async restore(): Promise<void> {
    try {
      const user = await api.getMe();
      runInAction(() => {
        this.user = user;
      });
    } catch {
      runInAction(() => {
        this.user = null;
      });
    } finally {
      runInAction(() => {
        this.isRestoring = false;
      });
    }
  }

  async loginTelegram(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const session = await api.loginWithTelegram();
      runInAction(() => {
        this.user = session.user;
      });
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  chooseRole(role: Role): void {
    this.pendingRole = role;
    this.error = null;
  }

  /** Подтверждение выбора роли: кнопка «Продолжить» на экране 02. */
  async confirmRole(): Promise<boolean> {
    const role = this.selectedRole;
    if (!role) return false;

    this.isLoading = true;
    this.error = null;
    try {
      const user = await api.setRole(role);
      runInAction(() => {
        this.user = user;
        this.pendingRole = null;
      });
      return true;
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  /** Переключатель «На работе» на экране профиля. */
  async toggleAvailability(): Promise<void> {
    const user = this.user;
    if (!user) return;

    try {
      const updated = await api.setAvailability(!user.isAvailable);
      runInAction(() => {
        this.user = updated;
      });
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
    }
  }

  async logout(): Promise<void> {
    await api.logout();
    runInAction(() => {
      this.user = null;
      this.pendingRole = null;
      this.error = null;
    });
  }

  clearError(): void {
    this.error = null;
  }
}
