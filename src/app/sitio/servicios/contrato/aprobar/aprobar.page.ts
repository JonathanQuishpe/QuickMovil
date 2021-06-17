import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../../../services/storage.service';
import { WebService } from '../../../../services/web.service';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { ToastService } from '../../../../services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var google;
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.page.html',
  styleUrls: ['./aprobar.page.scss'],
})
export class AprobarPage implements OnInit {
  PERFIL = environment.PERFIL;
  map: any;
  id: any;
  estado: string;
  aprobarForm: FormGroup;
  servicios;
  estados: any[];
  showcomentario = false;
  constructor(
    private storageService: StorageService,
    private webService: WebService,
    private router: Router,
    private navController: NavController,
    private geolocation: Geolocation,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.aprobarForm = this.formBuilder.group({
      estado: ['', Validators.required],
      id_contrato: [''],
      comentario: [''],
    });
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.lista();
  }
  lista() {
    this.webService.detalle_servicio(this.id).subscribe((result) => {
      this.servicios = result;
      this.cargar_estados(result[0].estado);
      var direccion = (result[0].direccion).split(';');
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

  cargar_estados(estado) {
    if (estado === 'Enviado') {
      this.estados = [
        { id: 1, nombre: 'Aprobar' },
        { id: 2, nombre: 'Rechazar' },
      ];
    } else {
      this.estados = [
        { id: 3, nombre: 'Finalizar' },
      ];
    }
  }

  save() {
    if (this.aprobarForm.valid) {
      var c = 'S/N';
      switch (Number(this.aprobarForm.value.estado)) {
        case 1:
          this.estado = 'Aprobado';
          break;
        case 2:
          this.estado = 'Rechazado';
          c = this.aprobarForm.value.comentario;
          break;
        case 3:
          this.estado = 'Finalizado';
          break;
      }
      this.aprobarForm.setValue({
        estado: this.estado,
        id_contrato: this.id,
        comentario: c
      });
      this.webService.cambiarEstado(this.aprobarForm.value).subscribe(result => {
        this.toastService.presentLoading('Guardando');
        this.navController.navigateRoot('/contrato');
      });
    } else {
      this.toastService.presentToast('Debe elegir un estado.');
    }
  }
}
