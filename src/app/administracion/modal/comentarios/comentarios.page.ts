import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { WebService } from '../../../services/web.service';
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  id_proveedor: any;
  comentarios: any = [];
  constructor(
    public viewCtrl: ModalController,
    public navParams: NavParams,
    public webService: WebService
  ) {
    this.id_proveedor = navParams.get('id');
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.cargar();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  cargar() {
    this.webService.comentarios(this.id_proveedor).subscribe(result => {
      this.comentarios = result;
      //console.log(result);
    });
  }
}
