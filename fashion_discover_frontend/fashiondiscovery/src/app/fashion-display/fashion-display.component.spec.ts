import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionDisplayComponent } from './fashion-display.component';

describe('FashionDisplayComponent', () => {
  let component: FashionDisplayComponent;
  let fixture: ComponentFixture<FashionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FashionDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
