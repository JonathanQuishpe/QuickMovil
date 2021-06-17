import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { WebService } from '../../../../services/web.service';
import { ToastService } from '../../../../services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { StorageService } from '../../../../services/storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { IonSearchbar } from '@ionic/angular/';
import { google } from "google-maps";
declare const google: google;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-contratar',
  templateUrl: './contratar.page.html',
  styleUrls: ['./contratar.page.scss'],
})
export class ContratarPage implements OnInit {
  /*@ViewChild('search', { static: false })
  public searchElementRef: IonSearchbar;*/
  @ViewChild('searchbar', { static: false }) searchElementRef: IonSearchbar;
  id_proveedor: any;
  proveedor: any = [];
  categoria_id: any;
  proveedor_id: any;
  SRC = environment.SRC;
  map: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  geocoder: any;
  markers: any;
  lat: number;
  lng: number;
  mapRef: any;
  zoom: number = 15;
  address: string;
  contratarForm: FormGroup;
  hora_min: any;
  hora_max: any;
  max_hora: number;
  min_hora: number;
  max_min: number;
  banco: string;
  cuenta: string;
  today = new Date();
  dateTill: any;
  direccion: string;
  usuario: any;
  constructor(
    private webService: WebService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private geolocation: Geolocation,
    private mapsAPILoader: MapsAPILoader,
    private navController: NavController,
  ) {
    this.id_proveedor = this.activatedRoute.snapshot.paramMap.get('id');
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
    this.today.setDate(this.today.getDate());
    this.dateTill = this.today.toISOString().substr(0, 10);
    this.contratarForm = this.formBuilder.group({
      forma: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^-?([0-9]\d*)?$/)]],
      convencional: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern(/^-?([0-9]\d*)?$/)]],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      hora: [''],
      minutos: [''],
      categoria: [''],
      proveedor: [''],
      usuario: [''],
      estado: [''],
      direccion: [''],
      referencia: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.storageService.get('usuario').then(res => {
      this.usuario = res;
    })
    this.cargar();
    this.loadMap();
  }

  cargar() {
    this.webService.datosContrato(this.id_proveedor).subscribe(result => {
      //console.log(result);
      this.proveedor = result;
      this.categoria_id = result[0].id_categoria;
      this.proveedor_id = result[0].id_proveedor;
      this.hora_min = result[0].hora_min;
      this.hora_max = result[0].hora_max;
      this.banco = result[0].banco;
      this.cuenta = result[0].cuenta;
      this.horas(result[0].hora_min, result[0].hora_max);
    });
  }
  loadMap() {
    this.mapsAPILoader.load().then(() => {
      this.setlocation();
      this.searchElementRef.getInputElement().then((input: HTMLInputElement) => {
        let autocomplete = new google.maps.places.Autocomplete(input, {
          types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {

            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.zoom = 15;
          });
        });
      })
    });
  }

  horas(inicio, fin) {
    var hora = inicio.split(':');
    var hora2 = fin.split(':');
    this.min_hora = hora[0];
    this.max_hora = hora2[0];
    if (Number(hora[1]) > Number(hora2[1])) {
      this.max_min = hora[1];
    } else {
      this.max_min = hora[1];
    }
    this.contratarForm.get('hora').setValidators([Validators.min(this.min_hora), Validators.max(this.max_hora), Validators.required]);
    this.contratarForm.get('minutos').setValidators([Validators.min(0), Validators.max(59), Validators.required]);
  }
  save() {
    if (this.contratarForm.valid) {
      this.direccion = this.lat.toString() + ';' + this.lng.toString();
      var date = this.contratarForm.value.fecha.split('T');
      this.contratarForm.patchValue({
        fecha: date[0],
        categoria: this.categoria_id,
        proveedor: this.proveedor_id,
        usuario: this.usuario.id,
        estado: 'Enviado',
        direccion: this.direccion,
      });
      //this.toastService.presentLoading('Actualizando datos');
      this.webService.guardarContrato(this.contratarForm.value).subscribe(result => {
        this.navController.navigateRoot('/estado');
        this.toastService.presentToast('Contrato generado.');
      }, (error) => {
        this.toastService.presentToast('Hay problemas en la red, intente mas tarde.');
      });
    } else {
      this.toastService.presentToast('Verfique el formulario y llene todos los campos.');
    }
  }

  async setlocation() {
    const rta = await this.geolocation.getCurrentPosition();
    this.lat = rta.coords.latitude;
    this.lng = rta.coords.longitude;
  }
  crearMarcador(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  markerDragEnd($event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.getAddress(this.lat, this.lng);
  }
  getAddress(latitude, longitude) {
    this.geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}
