import { Component } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { AuthHeaderInterceptorService } from './services/auth-header-interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'femalert-app';

}
