import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SciencesQuiz } from './sciences-quiz';

describe('SciencesQuiz', () => {
  let component: SciencesQuiz;
  let fixture: ComponentFixture<SciencesQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SciencesQuiz],
    }).compileComponents();

    fixture = TestBed.createComponent(SciencesQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
