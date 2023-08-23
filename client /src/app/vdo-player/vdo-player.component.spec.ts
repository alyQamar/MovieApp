import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VdoPlayerComponent } from './vdo-player.component';

describe('VdoPlayerComponent', () => {
  let component: VdoPlayerComponent;
  let fixture: ComponentFixture<VdoPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VdoPlayerComponent]
    });
    fixture = TestBed.createComponent(VdoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
