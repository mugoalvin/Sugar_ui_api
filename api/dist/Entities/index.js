var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
let Sugar = class Sugar {
    id;
    image;
    productName;
    size;
    price;
    originalPrice;
    discount;
    webLink;
    country;
    timestamp;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Sugar.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Sugar.prototype, "image", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Sugar.prototype, "productName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Sugar.prototype, "size", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Sugar.prototype, "price", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Sugar.prototype, "originalPrice", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Sugar.prototype, "discount", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Sugar.prototype, "webLink", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Sugar.prototype, "country", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Sugar.prototype, "timestamp", void 0);
Sugar = __decorate([
    Entity()
], Sugar);
export { Sugar };
//# sourceMappingURL=index.js.map