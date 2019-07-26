import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        //Als geen token is opgeslagen in de localStorage, stuurt de intercepter door zonder aanpassingen
        //In sommige gevallen is er geen token nodig
        
        if (this.authService.token != "")
            return handler.handle(request.clone({
                params: request.params.set('auth', this.authService.token)
            }));
        else
            return handler.handle(request);
    }
}