import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardValue } from './card-value';

describe('CardValue', () => {
  let component: CardValue;
  let fixture: ComponentFixture<CardValue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardValue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardValue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
