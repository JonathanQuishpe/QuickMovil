import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../../services/web.service';
import { ToastService } from '../../services/toast.service';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registerForm: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Usuario es requerido.' },
      { type: 'email', message: 'Formato no admitido' },
    ],
    'password': [
      { type: 'required', message: 'Contraseña es requerida.' }
    ],
    'names': [
      { type: 'required', message: 'Nombres requeridos' }
    ],
    'lastnames': [
      { type: 'required', message: 'Apellidos requeridos' }
    ],
    'user': [
      { type: 'required', message: 'Usuario requerido.' }
    ],
  }
  constructor(
    private formBuilder: FormBuilder,
    private webService: WebService,
    private toastService: ToastService,
    private navController: NavController,
    private menuC: MenuController,
  ) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      names: ['', Validators.required],
      lastnames: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ionViewDidEnter() {
    this.menuC.enable(false);
  }
  ionViewWillLeave() {
    this.menuC.enable(true);
  }

  save() {
    if (this.registerForm.valid) {
      this.toastService.presentLoading('Registrando..');
      this.webService.register(this.registerForm.value).subscribe((data) => {
        if (data === 'fail') {
          this.toastService.presentToast('El correo ya esta en uso.');
        } else {
          this.navController.navigateRoot('login');
          this.toastService.presentToast('Registro exitoso.');
        }
      });

    } else {
      this.toastService.presentToast('Debe llenar todos los campos.');
    }
  }

}
