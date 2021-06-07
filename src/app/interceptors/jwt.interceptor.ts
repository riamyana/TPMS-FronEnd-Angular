import { LoaderService } from './../_services/loader/loader.service';
import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private loader: LoaderService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.isLoading.next(true);
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = !!(currentUser && currentUser.jwtToken);
    const isApiUrl = request.url.startsWith(environment.serverUrl);

    console.log(request);
    console.log("login:" + isLoggedIn);


    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.jwtToken}`

        }
      });
    }

    return next.handle(request).pipe(
      finalize(
        () => {
          this.loader.isLoading.next(false);
        })
    );
  }
}
