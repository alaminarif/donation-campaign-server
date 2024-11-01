"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolunteerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const volunteer_controller_1 = require("./volunteer.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const volunteer_validation_1 = require("./volunteer.validation");
const router = express_1.default.Router();
router.get('/', volunteer_controller_1.VolunteerController.getAllVolunteers);
router.get('/:email', volunteer_controller_1.VolunteerController.getSingleVolunteer);
router.patch('/:email', (0, validateRequest_1.default)(volunteer_validation_1.VolunteerValidation.updateVolunteerValidationSchema), volunteer_controller_1.VolunteerController.updatedVolunteer);
router.delete('/:email', volunteer_controller_1.VolunteerController.deleteVolunteer);
exports.VolunteerRoutes = router;
