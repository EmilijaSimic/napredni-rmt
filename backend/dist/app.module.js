"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const kompanija_module_1 = require("./resources/kompanija/kompanija.module");
const korisnik_module_1 = require("./resources/korisnik/korisnik.module");
const iteracija_projekta_module_1 = require("./resources/iteracija-projekta/iteracija-projekta.module");
const korisnik_iteracija_module_1 = require("./resources/korisnik-iteracija/korisnik-iteracija.module");
const kompanija_iteracija_module_1 = require("./resources/kompanija-iteracija/kompanija-iteracija.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5431,
                username: 'postgres',
                password: 'lozinka',
                database: 'napredni_rmt_baza',
                autoLoadEntities: true,
                synchronize: true,
            }),
            kompanija_module_1.KompanijaModule,
            korisnik_module_1.KorisnikModule,
            iteracija_projekta_module_1.IteracijaProjektaModule,
            korisnik_iteracija_module_1.KorisnikIteracijaModule,
            kompanija_iteracija_module_1.KompanijaIteracijaModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map