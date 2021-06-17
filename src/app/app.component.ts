import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages: any;

  constructor(
    public storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storageService: StorageService,
    private navController: NavController,
    private fcm: FCM,
    private localNotifications: LocalNotifications
  ) {
    this.datos();
    this.initializeApp();
  }
  ngOnInit() {
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //fcm
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log("Received in background");
        } else {
          console.log(JSON.stringify(data));
          this.notificaciones(data);
        };
      });
    });
  }
  datos() {
    this.storage.get('inicio').then((val) => {
      if (val) {
        this.storageService.get('usuario').then((res: any) => {
          if (res.id_rol == 1) {
            this.appPages = [
              {
                title: 'Home',
                url: '/home',
                icon: 'person'
              },
              {
                title: 'Categorias',
                url: '/categorias',
                icon: 'book'
              },
              {
                title: 'Estado',
                url: '/estado',
                icon: 'copy'
              },
              {
                title: 'Salir',
                url: '/logout',
                icon: 'power'
              }
            ]
          } else {
            this.appPages = [
              {
                title: 'Home',
                url: '/home',
                icon: 'person'
              },
              {
                title: 'Categorias',
                url: '/categorias',
                icon: 'book'
              },
              {
                title: 'Estado',
                url: '/estado',
                icon: 'copy'
              },
              {
                title: 'Contratos',
                url: '/contrato',
                icon: 'briefcase'
              },
              {
                title: 'Salir',
                url: '/logout',
                icon: 'power'
              }
            ]
          }
        })

      } else {
        this.appPages = [
          {
            title: 'Home',
            url: '/informacion',
            icon: 'home'
          },
          {
            title: 'Categorias',
            url: '/categorias',
            icon: 'copy'
          },
        ]
      }
    });
  }

  menu() {
    this.datos();
    this.navController.navigateRoot('home');
  }
  logout() {
    this.storageService.clear();
    this.datos();
    this.navController.navigateRoot('informacion');
  }

  notificaciones(data) {
    this.localNotifications.schedule([{
      id: 2,
      title: data.title,
      text: data.body,
    }]);

  }
}
