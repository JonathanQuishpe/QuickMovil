import { Component, OnInit } from '@angular/core';
import { WebService } from '../../../services/web.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias: any = [];
  textoBuscar = '';
  constructor(
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
    this.toastService.presentLoading('Cargando..');
    this.lista();
  }

  lista() {
    this.webService.getCategorias().subscribe(res => {
      this.categorias = res;
      //console.log(res);
    })
  }

  selected(id) {
    this.router.navigateByUrl('categorias/proveedor/' + id);
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
    this.textoBuscar = this.textoBuscar.toLowerCase();
  }

}
