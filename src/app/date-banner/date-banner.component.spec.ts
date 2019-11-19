import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateBannerComponent } from './date-banner.component';

describe('DateBannerComponent', () => {
  let component: DateBannerComponent;
  let fixture: ComponentFixture<DateBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
