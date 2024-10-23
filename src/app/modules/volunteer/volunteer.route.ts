import expres from 'express';
import { VolunteerController } from './volunteer.controller';

const router = expres.Router();

router.get('/', VolunteerController.getAllvolunteers);

export const VolunteerRoutes = router;
