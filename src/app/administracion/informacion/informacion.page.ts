import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  slides = [
    {
      img: 'assets/img/side1.png',
      titulo: 'Quick Services para todo el hogar.',
      clase: 'side2'
    },
    {
      img: 'assets/img/side2.png',
      titulo: 'Contrata servicios con profesionales certificados.',
      clase: 'side2'
    },
    {
      img: 'assets/img/side3.png',
      titulo: 'Contrata servicios con profesionales certificados.',
      clase: 'side2'
    },
    {
      img: 'assets/img/side4.png',
      titulo: 'Contrata servicios con profesionales certificados.',
      clase: 'side2'
    },
    /*{
      img: 'assets/img/side5.png',
      titulo: 'Contrata servicios con profesionales certificados.',
      clase: 'side2'
    },
    {
      img: 'assets/img/side6.png',
      titulo: 'Contrata servicios con profesionales certificados.',
      clase: 'side2'
    },*/

  ]
  subscription: any;
  constructor(
    private menu: MenuController,
    private router: Router,
    public platform: Platform
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    //console.log('ionViewWillEnter');
  }
  ionViewDidEnter() {
    this.menu.enable(false);
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }
  ionViewWillLeave() {
    this.menu.enable(true);
    this.subscription.unsubscribe();
  }

}
