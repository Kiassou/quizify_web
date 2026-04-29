import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechQuiz } from './tech-quiz';

describe('TechQuiz', () => {
  let component: TechQuiz;
  let fixture: ComponentFixture<TechQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechQuiz],
    }).compileComponents();

    fixture = TestBed.createComponent(TechQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
