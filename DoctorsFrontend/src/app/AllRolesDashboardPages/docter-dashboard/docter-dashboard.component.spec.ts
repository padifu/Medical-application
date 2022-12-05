import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocterDashboardComponent } from './docter-dashboard.component';

describe('DocterDashboardComponent', () => {
  let component: DocterDashboardComponent;
  let fixture: ComponentFixture<DocterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocterDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
