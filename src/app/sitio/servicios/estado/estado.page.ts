import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { WebService } from '../../../services/web.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-estado',
  templateUrl: './estado.page.html',
  styleUrls: ['./estado.page.scss'],
})
export class EstadoPage implements OnInit {
  usuario: any;
  servicios: any = [];
  textoBuscar = '';
  constructor(
    private storageService: StorageService,
    private webService: WebService,
    private router: Router,
    private toastService: ToastService,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.router.navigateByUrl('home');
    });
  }

  ionViewWillEnter() {
    this.storageService.get('usuario').then((res: any) => {
      this.usuario = res;
      this.listaCategorias(res.id);
    });
  }

  ionViewDidEnter() {
   // this.toastService.presentLoading('Cargando..');
  }
  listaCategorias(id) {
    this.webService.listaServicios(id).subscribe((result) => {
      this.servicios = result;
    });
  }

  estrellas(number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  calificar(id) {
    this.router.navigateByUrl('estado/calificar/' + id);
  }
  detalles(id) {
    this.router.navigateByUrl('estado/info/' + id);
  }
  buscar(event) {
    this.textoBuscar = event.detail.value;
    this.textoBuscar = this.textoBuscar.toLowerCase();
  }


}
