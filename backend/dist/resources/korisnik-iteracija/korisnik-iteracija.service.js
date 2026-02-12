"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikIteracijaService = void 0;
const common_1 = require("@nestjs/common");
let KorisnikIteracijaService = class KorisnikIteracijaService {
    create(createKorisnikIteracijaDto) {
        return 'This action adds a new korisnikIteracija';
    }
    findAll() {
        return `This action returns all korisnikIteracija`;
    }
    findOne(id) {
        return `This action returns a #${id} korisnikIteracija`;
    }
    update(id, updateKorisnikIteracijaDto) {
        return `This action updates a #${id} korisnikIteracija`;
    }
    remove(id) {
        return `This action removes a #${id} korisnikIteracija`;
    }
};
exports.KorisnikIteracijaService = KorisnikIteracijaService;
exports.KorisnikIteracijaService = KorisnikIteracijaService = __decorate([
    (0, common_1.Injectable)()
], KorisnikIteracijaService);
//# sourceMappingURL=korisnik-iteracija.service.js.map