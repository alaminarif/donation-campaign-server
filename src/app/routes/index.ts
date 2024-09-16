import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { DonationRoutes } from '../modules/donation/donation.route';
import { CampaignRoutes } from '../modules/campaign/campaign.route';
import { CommentRoutes } from '../modules/comment/comment.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { RatingRoutes } from '../modules/rating/rating.route';
import { ManagerRoutes } from '../modules/manager/manager.route';

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
    path: '/managers',
    route: ManagerRoutes,
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
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/ratings',
    route: RatingRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
