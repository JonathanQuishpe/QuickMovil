import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { WebService } from '../../../services/web.service';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { AppComponent } from './../../../app.component';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  profileImage: any;
  usuario: any;
  PERFIL = environment.PERFIL;
  userForm: FormGroup;
  showPassowrd = false;
  passwordToggleIcon = 'eye';
  subscription: any;
  constructor(
    private storageService: StorageService,
    private webService: WebService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private app: AppComponent,
    private platform: Platform,
  ) {


    this.userForm = formBuilder.group({
      names: ['', [Validators.required]],
      lastnames: ['', Validators.required],
      password: ['', Validators.required],
      user: ['', Validators.required],
      id: [''],
    });
  }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  ionViewWillEnter() {
    this.storageService.get('usuario').then(res => {
      this.usuario = res;
      this.datos(res);
    });
  }


  datos(user) {
    this.webService.datos(user.id).subscribe((result) => {
      var imagen = '';
      if (result.imagen == 'S/N') {
        imagen = 'default.png'
      } else {
        imagen = result.imagen;
      }
      this.userForm.patchValue({
        names: result.names,
        lastnames: result.lastnames,
        password: result.pass,
        user: result.user,
        id: user.id
      });
      this.profileImage = imagen;
    });
  }
  doRefresh(event) {
    this.datos(this.usuario);
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  submit() {
    if (this.userForm.valid) {
      this.toastService.presentLoading('Actualizando datos');
      this.webService.updateUsuario(this.userForm.value).subscribe(result => {
        this.datos(this.usuario);
        this.toastService.presentToast('Datos actualizados.');
      }, (error) => {
        this.toastService.presentToast('Hay problemas en la red, intente mas tarde.');
      })
    } else {
      this.toastService.presentToast('Llenar todos los campos.');
    }
  }

  togglePassoword() {
    this.showPassowrd = !this.showPassowrd;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  salir() {
    this.app.logout();
  }

}
