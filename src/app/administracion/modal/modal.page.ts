import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';
import { ModalController, NavParams } from '@ionic/angular';
import { ComentariosPage } from './comentarios/comentarios.page';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  SRC = environment.SRC;
  id_proveedor: any;
  proveedor: any = [];
  constructor(
    private webService: WebService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    public modalCtrl: ModalController
  ) {
    this.id_proveedor = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.cargar();
  }

  cargar() {
    this.webService.datosContrato(this.id_proveedor).subscribe(result => {
      this.proveedor = result;
    });
  }

  mensaje() {
    this.toastService.presentToast('Inicie sesión para contratar!');
  }
  comentarios() {
    this.presentModal();
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ComentariosPage,
      componentProps: { id: this.id_proveedor }
    });
    return await modal.present();
  }
}
