import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveQuizzes } from './active-quizzes';

describe('ActiveQuizzes', () => {
  let component: ActiveQuizzes;
  let fixture: ComponentFixture<ActiveQuizzes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveQuizzes],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveQuizzes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
