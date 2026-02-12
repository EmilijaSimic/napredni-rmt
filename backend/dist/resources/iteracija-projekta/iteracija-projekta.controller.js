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
exports.IteracijaProjektaController = void 0;
const common_1 = require("@nestjs/common");
const iteracija_projekta_service_1 = require("./iteracija-projekta.service");
const create_iteracija_projekta_dto_1 = require("./dto/create-iteracija-projekta.dto");
const update_iteracija_projekta_dto_1 = require("./dto/update-iteracija-projekta.dto");
let IteracijaProjektaController = class IteracijaProjektaController {
    constructor(iteracijaProjektaService) {
        this.iteracijaProjektaService = iteracijaProjektaService;
    }
    create(createIteracijaProjektaDto) {
        return this.iteracijaProjektaService.create(createIteracijaProjektaDto);
    }
    findAll() {
        return this.iteracijaProjektaService.findAll();
    }
    findOne(id) {
        return this.iteracijaProjektaService.findOne(+id);
    }
    update(id, updateIteracijaProjektaDto) {
        return this.iteracijaProjektaService.update(+id, updateIteracijaProjektaDto);
    }
    remove(id) {
        return this.iteracijaProjektaService.remove(+id);
    }
};
exports.IteracijaProjektaController = IteracijaProjektaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_iteracija_projekta_dto_1.CreateIteracijaProjektaDto]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_iteracija_projekta_dto_1.UpdateIteracijaProjektaDto]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IteracijaProjektaController.prototype, "remove", null);
exports.IteracijaProjektaController = IteracijaProjektaController = __decorate([
    (0, common_1.Controller)('iteracija-projekta'),
    __metadata("design:paramtypes", [iteracija_projekta_service_1.IteracijaProjektaService])
], IteracijaProjektaController);
//# sourceMappingURL=iteracija-projekta.controller.js.map