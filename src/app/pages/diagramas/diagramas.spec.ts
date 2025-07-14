import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diagramas } from './diagramas';

describe('Diagramas', () => {
  let component: Diagramas;
  let fixture: ComponentFixture<Diagramas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diagramas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diagramas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
