import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportQuiz } from './sport-quiz';

describe('SportQuiz', () => {
  let component: SportQuiz;
  let fixture: ComponentFixture<SportQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportQuiz],
    }).compileComponents();

    fixture = TestBed.createComponent(SportQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
