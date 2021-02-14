import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionSuggestComponent } from './fashion-suggest.component';

describe('FashionSuggestComponent', () => {
  let component: FashionSuggestComponent;
  let fixture: ComponentFixture<FashionSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FashionSuggestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
