import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AprobarPage } from './aprobar.page';

describe('AprobarPage', () => {
  let component: AprobarPage;
  let fixture: ComponentFixture<AprobarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AprobarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
