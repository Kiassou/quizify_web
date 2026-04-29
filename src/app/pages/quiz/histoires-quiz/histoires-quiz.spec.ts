import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoiresQuiz } from './histoires-quiz';

describe('HistoiresQuiz', () => {
  let component: HistoiresQuiz;
  let fixture: ComponentFixture<HistoiresQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoiresQuiz],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoiresQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
