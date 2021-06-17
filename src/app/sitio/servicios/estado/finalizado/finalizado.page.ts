import { Component, OnInit } from '@angular/core';
import { WebService } from '../../../../services/web.service';
import { StorageService } from '../../../../services/storage.service';
import { ToastService } from '../../../../services/toast.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-finalizado',
  templateUrl: './finalizado.page.html',
  styleUrls: ['./finalizado.page.scss'],
})
export class FinalizadoPage implements OnInit {
  usuario: any;
  servicios: any = [];
  textoBuscar = '';
  constructor(
    private storageService: StorageService,
    private webService: WebService,
    private toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.storageService.get('usuario').then((res: any) => {
      this.usuario = res;
      this.listaCategorias(res.id);
    });
  }
  ionViewDidEnter() {
    this.toastService.presentLoading('Cargando..');
  }
  listaCategorias(id) {
    this.webService.listaServicios(id).subscribe((result) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].estado === 'Finalizado' || result[i].estado === 'Rechazado') {
          this.servicios.push(result[i]);
        }
      }
    });
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
    this.textoBuscar = this.textoBuscar.toLowerCase();
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



}
