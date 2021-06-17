import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from './../../services/toast.service';
import { WebService } from './../../services/web.service';
import { FirebaseService } from './../../services/firebase.service';
import { StorageService } from './../../services/storage.service';
import { AppComponent } from './../../app.component';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public storage: Storage,
    private menuC: MenuController,
    private router: Router,
    private toastService: ToastService,
    private webService: WebService,
    private storageService: StorageService,
    private app: AppComponent,
    private firebase: FirebaseService,
    private fcm: FCM
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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
  login() {
    if (this.loginForm.valid) {
      this.toastService.presentLoading('Espere por favor');
      this.webService.acceso(this.loginForm.value).subscribe(
        (res: any) => {
          if (res.length > 0) {
            //firebase
            var formToken = new FormData();
            this.fcm.getToken().then(token => {
              formToken.append('id', res[0].id);
              formToken.append('token', token);
              this.webService.guardarToken(formToken).subscribe(resul => {
                console.log('ok');
              });
            });
            //this.firebase.login(data);
            this.storageService.store('usuario', res[0]);
            this.prueba();
          } else {
            this.toastService.presentToast('Correo y contraseña incorrectos.');
          }
        },
        (error: any) => {
          this.toastService.presentToast('Problemas para conectar.');
        }
      );
    } else {
      this.toastService.presentToast('Por favor llenar todos los campos.');
    }
  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Correo requerido.' },
      { type: 'email', message: 'Formato no admitido' },
    ],
    'password': [
      { type: 'required', message: 'Contraseña es requerida.' }
    ]
  }

  async prueba() {
    await this.storage.set('inicio', true);
    this.app.menu();
  }

}
