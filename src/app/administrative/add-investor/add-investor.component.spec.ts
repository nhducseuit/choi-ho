import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestorComponent } from './add-investor.component';

describe('AddInvestorComponent', () => {
  let component: AddInvestorComponent;
  let fixture: ComponentFixture<AddInvestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInvestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
