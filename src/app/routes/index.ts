import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { DonationCategoryRoutes } from '../modules/donationCategory/donationCategory.route';
import { DonationRoutes } from '../modules/donation/donation.route';
import { CampaignRoutes } from '../modules/campaign/campaign.route';
import { CommentRoutes } from '../modules/comment/comment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/donation-categories',
    route: DonationCategoryRoutes,
  },
  {
    path: '/donations',
    route: DonationRoutes,
  },
  {
    path: '/campaigns',
    route: CampaignRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
