import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
})
export class ContratoPage implements OnInit {
  servicios: any;
  constructor(
    private platform: Platform,
    private router: Router,
  ) { }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.router.navigateByUrl('home');
    });
  }


}
