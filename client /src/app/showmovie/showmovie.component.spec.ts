import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmovieComponent } from './showmovie.component';

describe('ShowmovieComponent', () => {
  let component: ShowmovieComponent;
  let fixture: ComponentFixture<ShowmovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowmovieComponent]
    });
    fixture = TestBed.createComponent(ShowmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
