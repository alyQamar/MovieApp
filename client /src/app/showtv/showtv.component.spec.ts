import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtvComponent } from './showtv.component';

describe('ShowtvComponent', () => {
  let component: ShowtvComponent;
  let fixture: ComponentFixture<ShowtvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowtvComponent]
    });
    fixture = TestBed.createComponent(ShowtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
