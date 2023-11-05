import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  getItem<T>(key: string): T[] {
    return Array.from(JSON.parse(localStorage.getItem(key)!) || []);
  }

  setItem<T>(key: string, val: T): void {
    return localStorage.setItem(key, this.toString(val));
  }

  toString(arr: any): string {
    return JSON.stringify(arr);
  }
}
