"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KompanijaService = void 0;
const common_1 = require("@nestjs/common");
let KompanijaService = class KompanijaService {
    create(createKompanijaDto) {
        return 'This action adds a new kompanija';
    }
    findAll() {
        return `This action returns all kompanija`;
    }
    findOne(id) {
        return `This action returns a #${id} kompanija`;
    }
    update(id, updateKompanijaDto) {
        return `This action updates a #${id} kompanija`;
    }
    remove(id) {
        return `This action removes a #${id} kompanija`;
    }
};
exports.KompanijaService = KompanijaService;
exports.KompanijaService = KompanijaService = __decorate([
    (0, common_1.Injectable)()
], KompanijaService);
//# sourceMappingURL=kompanija.service.js.map