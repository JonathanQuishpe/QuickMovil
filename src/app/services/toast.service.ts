import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  async presentToast(infoMessage: string) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 3000
    });
    toast.present();
  }

  async presentLoading(text) {
    const loading = await this.loadingController.create({
      message: text,
      duration: 2000
    });
    loading.present();
  }
}
