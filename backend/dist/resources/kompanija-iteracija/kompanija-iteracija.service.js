"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KompanijaIteracijaService = void 0;
const common_1 = require("@nestjs/common");
let KompanijaIteracijaService = class KompanijaIteracijaService {
    create(createKompanijaIteracijaDto) {
        return 'This action adds a new kompanijaIteracija';
    }
    findAll() {
        return `This action returns all kompanijaIteracija`;
    }
    findOne(id) {
        return `This action returns a #${id} kompanijaIteracija`;
    }
    update(id, updateKompanijaIteracijaDto) {
        return `This action updates a #${id} kompanijaIteracija`;
    }
    remove(id) {
        return `This action removes a #${id} kompanijaIteracija`;
    }
};
exports.KompanijaIteracijaService = KompanijaIteracijaService;
exports.KompanijaIteracijaService = KompanijaIteracijaService = __decorate([
    (0, common_1.Injectable)()
], KompanijaIteracijaService);
//# sourceMappingURL=kompanija-iteracija.service.js.map