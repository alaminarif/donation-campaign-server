import expres from 'express';
import { VolunteerController } from './volunteer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { VolunteerValidation } from './volunteer.validation';

const router = expres.Router();

router.get('/', VolunteerController.getAllVolunteers);

router.get('/:volunteerId', VolunteerController.getSingleVolunteer);

router.patch(
  '/:email',
  validateRequest(VolunteerValidation.updateVolunteerValidationSchema),
  VolunteerController.updatedVolunteer
);

router.delete('/:email', VolunteerController.deleteVolunteer);

export const VolunteerRoutes = router;
