import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createquiz } from './createquiz';

describe('Createquiz', () => {
  let component: Createquiz;
  let fixture: ComponentFixture<Createquiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createquiz],
    }).compileComponents();

    fixture = TestBed.createComponent(Createquiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
