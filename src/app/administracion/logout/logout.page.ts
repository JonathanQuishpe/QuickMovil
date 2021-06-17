import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app/app.component';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private menu: AppComponent,
    private toastService: ToastService
  ) {
    this.menu.logout();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.toastService.presentLoading('Cerrando sesión..');
  }

}
