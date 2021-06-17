import { Component, OnInit } from '@angular/core';
import { WebService } from '../../../../services/web.service';
import { ToastService } from '../../../../services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { StorageService } from '../../../../services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.page.html',
  styleUrls: ['./proveedor.page.scss'],
})
export class ProveedorPage implements OnInit {
  SRC = environment.SRC;
  textoBuscar = '';
  id: string;
  nombreCategoria: string
  categorias: any = [];
  proveedores: any = [];

  constructor(
    private webService: WebService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private storageService: StorageService,
    private router: Router,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.toastService.presentLoading('Cargando...');
  }
  ionViewDidEnter() {
    this.listaProveedores();
    this.nombre();
  }
  listaProveedores() {
    this.webService.proveedorXcategoria(this.id).subscribe(result => {
      this.proveedores = result;
    });
  }
  nombre() {
    this.webService.getCategorias().subscribe((result) => {
      this.categorias = result;
    });
  }
  estrellas(number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
    this.textoBuscar = this.textoBuscar.toLowerCase();
  }

  contratar(id) {
    this.storageService.get('usuario').then((res: any) => {
      if (res == null) {
        //this.toastService.presentToast('Inicie sesión para contratar un servicio.');
        this.router.navigateByUrl('modal/' + id);
      } else {
        this.router.navigateByUrl('contrato/contratar/' + id);
      }
    })
  }
}
