import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsComponent } from './shows.component';

describe('ShowsComponent', () => {
  let component: ShowsComponent;
  let fixture: ComponentFixture<ShowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowsComponent]
    });
    fixture = TestBed.createComponent(ShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
