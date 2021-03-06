/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SplitViewComponent } from './split-view.component';

describe('SplitViewComponent', () => {
  let component: SplitViewComponent;
  let fixture: ComponentFixture<SplitViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
