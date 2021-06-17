import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../services/storage.service';
import { WebService } from '../../../../services/web.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
@Component({
  selector: 'app-transito',
  templateUrl: './transito.page.html',
  styleUrls: ['./transito.page.scss'],
})
export class TransitoPage implements OnInit {
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
    this.webService.aprobar_transito(id).subscribe((result) => {
      this.servicios = result;
    });
  }
  aprobar(id) {
    this.router.navigateByUrl('contrato/aprobar/' + id);
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
    this.textoBuscar = this.textoBuscar.toLowerCase();
  }
}
