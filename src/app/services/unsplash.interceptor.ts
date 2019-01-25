import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '@env';


export class UnsplashInterceptor implements HttpInterceptor {

  static handleError(error: HttpErrorResponse) {
    console.error (error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Accept-Version': environment.unsplash.apiVersion,
        Authorization: `Client-ID ${environment.unsplash.accessKey}`
      }
    });
    return next.handle(request)
      .pipe(
        retry(1),
        catchError(UnsplashInterceptor.handleError)
      );
  }
}
