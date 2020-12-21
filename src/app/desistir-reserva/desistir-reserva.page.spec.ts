import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesistirReservaPage } from './desistir-reserva.page';

describe('DesistirReservaPage', () => {
  let component: DesistirReservaPage;
  let fixture: ComponentFixture<DesistirReservaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesistirReservaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesistirReservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
