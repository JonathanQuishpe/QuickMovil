import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    public storageService: StorageService,
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService
        .get('usuario')
        .then(res => {
          if (res != null) {
            resolve(true);
          } else {
            this.router.navigate(['informacion']);
            resolve(false);
          }
        })
        .catch(err => {
          resolve(false);
        });
    });
  }
}
