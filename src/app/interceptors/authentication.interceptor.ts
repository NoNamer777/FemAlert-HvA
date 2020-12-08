import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  AUTH_KEY = 'Authorization';

  constructor(private  authenticateService: AuthenticateService) {}

  /**
   * Intercepts login response to get Authentication token
   * Intercepts request if token is not null add authorization header to request
   * @param request is request to intercept
   * @param next is http handler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authToken: string;
    let newRequest: HttpRequest<any>;

    if (this.authenticateService.token != null){
      authToken = 'Bearer ' + this.authenticateService.token;
      const headers = new HttpHeaders({
        Authorization : authToken
      });
      newRequest = request.clone({headers});
    }
    else {
      newRequest = request;
    }

    return next.handle(newRequest).pipe(map((response: HttpEvent<any>) => {
      if (response instanceof HttpResponse) {
        if (response.headers.get(this.AUTH_KEY) != null){
          let token = response.headers.get(this.AUTH_KEY);
          token = token.replace('Bearer ', '');
          this.authenticateService.token = token;
        }
      }

      return response;
    }));
  }
}
