import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaReservasPage } from './lista-reservas.page';

describe('ListaReservasPage', () => {
  let component: ListaReservasPage;
  let fixture: ComponentFixture<ListaReservasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReservasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaReservasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
