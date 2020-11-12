import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthenticateService } from './authenticate.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor{

  constructor(private  authenticateService: AuthenticateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map((response: HttpEvent<any>) => {
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
