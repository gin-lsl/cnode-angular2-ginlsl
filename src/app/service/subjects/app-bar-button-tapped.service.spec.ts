/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppBarButtonTappedService } from './app-bar-button-tapped.service';

describe('AppBarButtonTappedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppBarButtonTappedService]
    });
  });

  it('should ...', inject([AppBarButtonTappedService], (service: AppBarButtonTappedService) => {
    expect(service).toBeTruthy();
  }));
});
