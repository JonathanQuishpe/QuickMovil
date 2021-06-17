import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../services/storage.service';
import { WebService } from '../../../../services/web.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
@Component({
  selector: 'app-finalizado',
  templateUrl: './finalizado.page.html',
  styleUrls: ['./finalizado.page.scss'],
})
export class FinalizadoPage implements OnInit {
  servicios: any = [];
  textoBuscar = '';
  constructor(
    private storageService: StorageService,
    private webService: WebService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.toastService.presentLoading('Cargando..');
    this.storageService.get('usuario').then((res: any) => {
      this.listaCategorias(res.id_proveedor);
    });
  }

  listaCategorias(id) {
    this.webService.aprobar_finalizado(id).subscribe((result) => {
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

  aprobar(id) {
    this.router.navigateByUrl('contrato/aprobar/' + id);
  }
  buscar(event) {
    this.textoBuscar = event.detail.value;
    this.textoBuscar = this.textoBuscar.toLowerCase();
  }
}
