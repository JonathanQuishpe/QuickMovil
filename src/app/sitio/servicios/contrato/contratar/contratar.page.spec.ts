import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContratarPage } from './contratar.page';

describe('ContratarPage', () => {
  let component: ContratarPage;
  let fixture: ComponentFixture<ContratarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContratarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
