import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../../../../services/web.service';
import { StorageService } from '../../../../services/storage.service';
import { ToastService } from '../../../../services/toast.service';
import { environment } from '../../../../../environments/environment';
declare var google;
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  PERFIL = environment.PERFIL;
  id_contrato: any;
  contrato: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private webService: WebService,
    private storageService: StorageService,
    private toastService: ToastService,
  ) {
    this.id_contrato = this.activatedRoute.snapshot.paramMap.get('id');
    this.storageService.get('usuario').then((res: any) => {
      this.lista(res.id);
    });
  }

  ngOnInit() {
  }
  ionViewDidEnter() {

  }
  lista(id) {
    this.webService.listaServicios(id).subscribe((result) => {
      let obj = result.find(obj => obj.id_contrato == this.id_contrato);
      this.contrato.push(obj);
      var direccion = (obj.direccion).split(';');
      var lat = Number(direccion[0]);
      var lng = Number(direccion[1]);
      this.loadMap(lat, lng);
    });
  }
  async loadMap(lat: number, lng: number) {
    this.toastService.presentLoading('Cargando..');
    //const rta = await this.geolocation.getCurrentPosition();
    const myLatLng = {
      lat: lat,
      lng: lng
    }
    const mapEle: HTMLElement = document.getElementById('map');
    const map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event
      .addListenerOnce(map, 'idle', () => {
        const marker = new google.maps.Marker({
          position: {
            lat: myLatLng.lat,
            lng: myLatLng.lng
          },
          zoom: 8,
          map: map,
          title: 'dadsa'
        })
      })
  }

}
