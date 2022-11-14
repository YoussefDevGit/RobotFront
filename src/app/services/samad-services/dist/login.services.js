"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginService = void 0;
var core_1 = require("@angular/core");
var variables_model_1 = require("../variables.model");
var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
        this.url = variables_model_1.URL;
    }
    //-----------------Authentification gestion --------------------//
    LoginService.prototype.login = function (login) {
        return this.http.post(this.url + '/Users/Login', login);
    };
    LoginService.prototype.getConnectedUser = function () {
        return this.http.get(this.url + '/Users/GetConnectedUser');
    };
    LoginService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
