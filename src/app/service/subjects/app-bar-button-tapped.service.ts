import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable()
export class AppBarButtonTappedService {

  private appBarButtonTappedSource = new Subject<boolean>();

  public appBarButtonTapped$ = this.appBarButtonTappedSource.asObservable();

  constructor() { }

  public nextAppBarButtonTapped(val: boolean) {
    this.appBarButtonTappedSource.next(val);
  }

}
