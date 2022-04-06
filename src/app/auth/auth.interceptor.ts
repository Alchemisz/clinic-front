import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if(!user){
          return next.handle(request);
        }
        
        const modifiedRequest = request.clone(
          {headers: request.headers.set("Authorization", "Bearer " + user.token)}
        );
        
        console.log("Wyslano: ");
        console.log(modifiedRequest);
        
        return next.handle(modifiedRequest);
      })
    );
  }
}
