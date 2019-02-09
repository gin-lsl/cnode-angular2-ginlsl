import { Component } from '@angular/core';
import { Title, SafeHtml, DomSanitizer } from '@angular/platform-browser';

import { ConfigService } from './service/config.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    private _configService: ConfigService,
  ) {

    // console.log(_configService.getAccessToken());
  }

}
