"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthGuard = void 0;
var core_1 = require("@angular/core");
var jwtDecode = require("jwt-decode");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (state.url) {
            localStorage.setItem('lastUrl', state.url);
        }
        var token = localStorage.getItem('token');
        if (token) {
            var decoded = jwtDecode(token);
            var date = new Date(0);
            var tokenExpDate = date.setUTCSeconds(decoded.exp);
            if (decoded.exp === undefined) {
                localStorage.removeItem('token');
                this.router.navigate(['login']);
                return false;
            }
            else if (tokenExpDate.valueOf() > new Date().valueOf()) {
                return true;
            }
            else {
                localStorage.removeItem('token');
                this.router.navigate(['login']);
                return false;
            }
        }
        else {
            this.router.navigate(['login']);
            return false;
        }
    };
    AuthGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
