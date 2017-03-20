import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private queryParams: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(query => {
      this.queryParams = query['search'];
      console.log(this.queryParams);
    });
  }

}
