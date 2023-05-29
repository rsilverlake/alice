import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliceLocaleComponent } from './alice-locale.component';

describe('AliceLocaleComponent', () => {
  let component: AliceLocaleComponent;
  let fixture: ComponentFixture<AliceLocaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AliceLocaleComponent]
    });
    fixture = TestBed.createComponent(AliceLocaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
