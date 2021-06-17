import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstadoPage } from './estado.page';

describe('EstadoPage', () => {
  let component: EstadoPage;
  let fixture: ComponentFixture<EstadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
