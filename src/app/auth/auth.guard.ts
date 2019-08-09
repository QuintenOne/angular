import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, CanLoad } from "@angular/router";

@Injectable()
export class AuthGuardActivateIfLoggedIn implements CanActivate, CanLoad {
    canActivate() {
        return this.isLoggedIn();
    }

    canLoad() {
        return this.isLoggedIn();
    }

    isLoggedIn() {
        return localStorage.getItem('username') != "";
    }
}

@Injectable()
export class AuthGuardActivateIfLoggedOut implements CanActivate, CanLoad {
    canActivate() {
        return this.isLoggedOut();
    }

    canLoad() {
        return this.isLoggedOut();
    }

    isLoggedOut() {
        return localStorage.getItem('username') == "";
    }
}

@Injectable()
export class AuthGuardDeactivate implements CanDeactivate<any> {
    canDeactivate() {
        return confirm('Do you want to exit?');
    }
}