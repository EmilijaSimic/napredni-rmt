"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikIteracijaController = void 0;
const common_1 = require("@nestjs/common");
const korisnik_iteracija_service_1 = require("./korisnik-iteracija.service");
const create_korisnik_iteracija_dto_1 = require("./dto/create-korisnik-iteracija.dto");
const update_korisnik_iteracija_dto_1 = require("./dto/update-korisnik-iteracija.dto");
let KorisnikIteracijaController = class KorisnikIteracijaController {
    constructor(korisnikIteracijaService) {
        this.korisnikIteracijaService = korisnikIteracijaService;
    }
    create(createKorisnikIteracijaDto) {
        return this.korisnikIteracijaService.create(createKorisnikIteracijaDto);
    }
    findAll() {
        return this.korisnikIteracijaService.findAll();
    }
    findOne(id) {
        return this.korisnikIteracijaService.findOne(+id);
    }
    update(id, updateKorisnikIteracijaDto) {
        return this.korisnikIteracijaService.update(+id, updateKorisnikIteracijaDto);
    }
    remove(id) {
        return this.korisnikIteracijaService.remove(+id);
    }
};
exports.KorisnikIteracijaController = KorisnikIteracijaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_korisnik_iteracija_dto_1.CreateKorisnikIteracijaDto]),
    __metadata("design:returntype", void 0)
], KorisnikIteracijaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KorisnikIteracijaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KorisnikIteracijaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_korisnik_iteracija_dto_1.UpdateKorisnikIteracijaDto]),
    __metadata("design:returntype", void 0)
], KorisnikIteracijaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KorisnikIteracijaController.prototype, "remove", null);
exports.KorisnikIteracijaController = KorisnikIteracijaController = __decorate([
    (0, common_1.Controller)('korisnik-iteracija'),
    __metadata("design:paramtypes", [korisnik_iteracija_service_1.KorisnikIteracijaService])
], KorisnikIteracijaController);
//# sourceMappingURL=korisnik-iteracija.controller.js.map