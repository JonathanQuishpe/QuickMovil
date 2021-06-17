import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from './../../services/toast.service';
import { WebService } from './../../services/web.service';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  loginForm: FormGroup;
  loading = true;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private webService: WebService,
    private menuC: MenuController,
    public loadingController: LoadingController,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.menuC.enable(false);
  }
  ionViewWillLeave() {
    this.menuC.enable(true);
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Correo requerido.' },
      { type: 'email', message: 'Formato no admitido' },
    ]
  }
  login() {
    if (this.loginForm.valid) {
      this.presentLoading();
      this.webService.reestablecer(this.loginForm.value).subscribe(
        (res: any) => {
          this.loadingController.dismiss();
          this.toastService.presentToast(res.message);
        },
        (error: any) => {
          this.loadingController.dismiss();
          this.toastService.presentToast('Problemas para conectar.');
        }
      );
    } else {
      this.toastService.presentToast('Por favor ingresar el correo.');
    }
  }
  async presentLoading() {
    let loading = await this.loadingController.create({
      message: 'Espere por favor...',
    });
    await loading.present();
  }
}
