import expres from 'express';
import { VolunteerController } from './volunteer.controller';

const router = expres.Router();

router.get('/', VolunteerController.getAllVolunteers);

router.get('/:volunteerId', VolunteerController.getSingleVolunteer);

router.patch('/:email', VolunteerController.updatedVolunteer);

router.delete('/:email', VolunteerController.deleteVolunteer);

export const VolunteerRoutes = router;
