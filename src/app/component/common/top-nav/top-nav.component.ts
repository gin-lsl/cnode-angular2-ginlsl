import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.styl']
})
export class TopNavComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  doSearch(val: string) {
    console.log('search');
    this._router.navigate(['/search'], { queryParams: { search: val } });
  }

}
