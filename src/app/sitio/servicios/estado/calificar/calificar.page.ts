import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../../../../services/web.service';
import { ToastService } from '../../../../services/toast.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.page.html',
  styleUrls: ['./calificar.page.scss'],
})
export class CalificarPage implements OnInit {
  calificarForm: FormGroup;
  id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private webService: WebService,
    private navController: NavController,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.calificarForm = this.formBuilder.group({
      valor: ['', Validators.required],
      id_contrato: [''],
      comentario: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  save() {
    if (this.calificarForm.valid) {
      this.calificarForm.patchValue({
        id_contrato: this.id
      });
      this.webService.calificar(this.calificarForm.value).subscribe(result => {
        this.navController.navigateRoot('/estado');
      });
    } else {
      this.toastService.presentToast('Llene todos los campos.');
    }
  }

}
