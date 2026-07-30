import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { User } from '@/api/types';
import { toMessage } from '@/lib/errors';

const RESEND_SECONDS = 60;
export const CODE_LENGTH = 4;

/** Вход по номеру: экраны 14 и 15. */
export class PhoneAuthStore {
  /** Только цифры без кода страны: «9287451903». */
  phone = '';
  code = '';
  isLoading = false;
  error: string | null = null;
  secondsLeft = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get isPhoneValid(): boolean {
    return this.phone.length === 10;
  }

  get isCodeValid(): boolean {
    return this.code.length === CODE_LENGTH;
  }

  /** «928 745-19-03» — маска из макета. */
  get phoneMasked(): string {
    const digits = this.phone;
    let result = digits.slice(0, 3);
    if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
    if (digits.length > 6) result += `-${digits.slice(6, 8)}`;
    if (digits.length > 8) result += `-${digits.slice(8, 10)}`;
    return result;
  }

  get fullPhone(): string {
    return `+7 ${this.phoneMasked}`;
  }

  get canResend(): boolean {
    return this.secondsLeft === 0;
  }

  /** «0:42» под ячейками кода. */
  get resendLabel(): string {
    const minutes = Math.floor(this.secondsLeft / 60);
    const seconds = String(this.secondsLeft % 60).padStart(2, '0');
    return `${String(minutes)}:${seconds}`;
  }

  setPhone(value: string): void {
    this.phone = value.replace(/\D/g, '').slice(0, 10);
    this.error = null;
  }

  setCode(value: string): void {
    this.code = value.replace(/\D/g, '').slice(0, CODE_LENGTH);
    this.error = null;
  }

  tick(): void {
    if (this.secondsLeft > 0) this.secondsLeft -= 1;
  }

  async requestCode(): Promise<boolean> {
    if (!this.isPhoneValid) return false;

    this.isLoading = true;
    this.error = null;
    try {
      await api.requestPhoneCode(`+7${this.phone}`);
      runInAction(() => {
        this.secondsLeft = RESEND_SECONDS;
        this.code = '';
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

  async confirm(): Promise<User | null> {
    if (!this.isCodeValid) return null;

    this.isLoading = true;
    this.error = null;
    try {
      const session = await api.confirmPhoneCode(`+7${this.phone}`, this.code);
      return session.user;
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
      return null;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  reset(): void {
    this.phone = '';
    this.code = '';
    this.error = null;
    this.secondsLeft = 0;
  }
}
