import { Component } from '@angular/core';
import { Title, SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';

import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private http: Http,
    private domSanitizer: DomSanitizer,
    private _configService: ConfigService,
  ) {

    // console.log(_configService.getAccessToken());
  }

}
