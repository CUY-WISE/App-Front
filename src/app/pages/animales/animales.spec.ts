import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalesComponent } from './animales';

describe('AnimalesComponent', () => {
  let component: AnimalesComponent;
  let fixture: ComponentFixture<AnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
