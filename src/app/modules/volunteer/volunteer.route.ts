import expres from 'express';
import { VolunteerController } from './volunteer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { VolunteerValidation } from './volunteer.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = expres.Router();

router.get(
  '/',
  auth(
    USER_ROLE.volunteer,
    USER_ROLE.manager,
    USER_ROLE.admin,
    USER_ROLE.super_admin
  ),
  VolunteerController.getAllVolunteers
);

router.get(
  '/:id',
  auth(USER_ROLE.manager, USER_ROLE.admin, USER_ROLE.super_admin),
  VolunteerController.getSingleVolunteer
);

router.patch(
  '/:email',
  validateRequest(VolunteerValidation.updateVolunteerValidationSchema),
  auth(USER_ROLE.manager, USER_ROLE.admin, USER_ROLE.super_admin),
  VolunteerController.updatedVolunteer
);

router.delete(
  '/:email',
  auth(USER_ROLE.manager, USER_ROLE.admin, USER_ROLE.super_admin),
  VolunteerController.deleteVolunteer
);

export const VolunteerRoutes = router;
