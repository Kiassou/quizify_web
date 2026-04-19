import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlayers } from './home-players';

describe('HomePlayers', () => {
  let component: HomePlayers;
  let fixture: ComponentFixture<HomePlayers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePlayers],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePlayers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
