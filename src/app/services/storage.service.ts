import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private storage: Storage,
  ) { }

  async store(storageKey: string, value: any) {
    await this.storage.set(storageKey, JSON.stringify(value));
  }
  // Get the value
  /*async get(storageKey: string) {
    await this.storage.get(storageKey).then((val) => {
      return JSON.parse(val);
    });
  }*/
  async get(key: string): Promise<void> {
    try {
      const result = await this.storage.get(key);
      return JSON.parse(result);
    }
    catch (e) { console.log(e) }
  }

  async removeStorageItem(storageKey: string) {
    await this.storage.remove(storageKey);
  }

  // Clear storage
  async clear() {
    await this.storage.clear();
  }

}
