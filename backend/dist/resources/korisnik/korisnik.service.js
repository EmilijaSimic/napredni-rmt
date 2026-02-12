"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikService = void 0;
const common_1 = require("@nestjs/common");
let KorisnikService = class KorisnikService {
    create(createKorisnikDto) {
        return 'This action adds a new korisnik';
    }
    findAll() {
        return `This action returns all korisnik`;
    }
    findOne(id) {
        return `This action returns a #${id} korisnik`;
    }
    update(id, updateKorisnikDto) {
        return `This action updates a #${id} korisnik`;
    }
    remove(id) {
        return `This action removes a #${id} korisnik`;
    }
};
exports.KorisnikService = KorisnikService;
exports.KorisnikService = KorisnikService = __decorate([
    (0, common_1.Injectable)()
], KorisnikService);
//# sourceMappingURL=korisnik.service.js.map