"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGuestId = exports.findLastGuestId = exports.generateDonorId = exports.findLastDonorId = exports.generateVolunteerId = exports.findLastVolunteerId = exports.generateManagerId = exports.findLastManagerId = exports.generateAdminId = exports.findLastAdminId = void 0;
const user_model_1 = require("./user.model");
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield user_model_1.User.findOne({
        role: 'admin',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id.substring(2) : undefined;
});
exports.findLastAdminId = findLastAdminId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastAdminId = yield (0, exports.findLastAdminId)();
    if (lastAdminId) {
        currentId = lastAdminId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generateAdminId = generateAdminId;
const findLastManagerId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastManagerId = yield user_model_1.User.findOne({
        role: 'manager',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastManagerId === null || lastManagerId === void 0 ? void 0 : lastManagerId.id) ? lastManagerId.id.substring(2) : undefined;
});
exports.findLastManagerId = findLastManagerId;
const generateManagerId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastManagerId = yield (0, exports.findLastManagerId)();
    if (lastManagerId) {
        currentId = lastManagerId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `M-${incrementId}`;
    return incrementId;
});
exports.generateManagerId = generateManagerId;
const findLastVolunteerId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastVolunteer = yield user_model_1.User.findOne({
        role: 'volunteer',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastVolunteer === null || lastVolunteer === void 0 ? void 0 : lastVolunteer.id) ? lastVolunteer.id.substring(2) : undefined;
});
exports.findLastVolunteerId = findLastVolunteerId;
const generateVolunteerId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastVolunteerId = yield (0, exports.findLastVolunteerId)();
    if (lastVolunteerId) {
        currentId = lastVolunteerId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `V-${incrementId}`;
    return incrementId;
});
exports.generateVolunteerId = generateVolunteerId;
const findLastDonorId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastDonor = yield user_model_1.User.findOne({
        role: 'donor',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastDonor === null || lastDonor === void 0 ? void 0 : lastDonor.id) ? lastDonor.id.substring(2) : undefined;
});
exports.findLastDonorId = findLastDonorId;
const generateDonorId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastDonorId = yield (0, exports.findLastDonorId)();
    if (lastDonorId) {
        currentId = lastDonorId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `D-${incrementId}`;
    return incrementId;
});
exports.generateDonorId = generateDonorId;
const findLastGuestId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastGuest = yield user_model_1.User.findOne({
        role: 'guest',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastGuest === null || lastGuest === void 0 ? void 0 : lastGuest.id) ? lastGuest.id.substring(2) : undefined;
});
exports.findLastGuestId = findLastGuestId;
const generateGuestId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastGuestId = yield (0, exports.findLastGuestId)();
    if (lastGuestId) {
        currentId = lastGuestId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `G-${incrementId}`;
    return incrementId;
});
exports.generateGuestId = generateGuestId;
