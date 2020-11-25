import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private  authenticateService: AuthenticateService) {}

  /**
   * Intercepts login request to get Authentication token
   * Intercepts Todo
   * @param request is request to intercept
   * @param next is http handler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(map((response: HttpEvent<any>) => {
      if (response instanceof HttpResponse) {
        if (response.headers.get('Authorization') != null){
          let token = response.headers.get('Authorization');
          token = token.replace('Bearer ', '');
          this.authenticateService.token = token;
        }
      }
      if (response instanceof  HttpRequest) {
        if (response.method === 'GET'){
          // Todo: add token to request if auth
        }
      }
      return response;
    }));
  }
}
