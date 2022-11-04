// /* eslint-disable sort-imports */
// import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

// import { TokenStorageService } from '../services/token-storage.service';
// import { AuthService } from '../services/auth.service';

// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, filter, switchMap, take } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';

// const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end
// // const TOKEN_HEADER_KEY = 'x-access-token'; // for Node.js Express back-end

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     private isRefreshing = false;
//     private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

//     constructor(
//         private tokenService: TokenStorageService,
//         private authService: AuthService,
//         private toast: ToastrService
//     ) {}

//     // eslint-disable-next-line @typescript-eslint/ban-types
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
//         let authReq = req;
//         const token = this.tokenService.getToken();
//         if (token != null) {
//             authReq = this.addTokenHeader(req, token);
//         }

//         return next.handle(authReq).pipe(
//             catchError(error => {
//                 if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/login') && error.status === 401) {
//                     return this.handle401Error(authReq, next);
//                 } else {
//                     this.toast.error(`Lỗi ${error.status}`, error.message);
//                 }
//                 return throwError(error);
//             })
//         );
//     }

//     private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//         if (!this.isRefreshing) {
//             this.isRefreshing = true;
//             this.refreshTokenSubject.next(null);

//             const token = this.tokenService.getRefreshToken();

//             if (token)
//                 return this.authService.refreshToken(token).pipe(
//                     switchMap((token: any) => {
//                         this.isRefreshing = false;
//                         this.tokenService.saveToken(token.accessToken);
//                         this.refreshTokenSubject.next(token.accessToken);

//                         return next.handle(this.addTokenHeader(request, token.accessToken));
//                     }),
//                     catchError(err => {
//                         this.isRefreshing = false;

//                         this.tokenService.signOut();
//                         return throwError(err);
//                     })
//                 );
//         }

//         return this.refreshTokenSubject.pipe(
//             filter(token => token !== null),
//             take(1),
//             switchMap(token => next.handle(this.addTokenHeader(request, token)))
//         );
//     }

//     private addTokenHeader(request: HttpRequest<any>, token: string) {
//         return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
//     }
// }

// export const authInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
