"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const admin_route_1 = require("../modules/admin/admin.route");
const donation_route_1 = require("../modules/donation/donation.route");
const campaign_route_1 = require("../modules/campaign/campaign.route");
// import { CommentRoutes } from '../modules/comment/comment.route';
// import { BlogRoutes } from '../modules/blog/blog.route';
// import { RatingRoutes } from '../modules/rating/rating.route';
const manager_route_1 = require("../modules/manager/manager.route");
const volunteer_route_1 = require("../modules/volunteer/volunteer.route");
const donor_route_1 = require("../modules/donor/donor.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/volunteers',
        route: volunteer_route_1.VolunteerRoutes,
    },
    {
        path: '/managers',
        route: manager_route_1.ManagerRoutes,
    },
    {
        path: '/donors',
        route: donor_route_1.DonorRoutes,
    },
    {
        path: '/donations',
        route: donation_route_1.DonationRoutes,
    },
    {
        path: '/campaigns',
        route: campaign_route_1.CampaignRoutes,
    },
    // {
    //   path: '/blogs',
    //   route: BlogRoutes,
    // },
    // {
    //   path: '/ratings',
    //   route: RatingRoutes,
    // },
    // {
    //   path: '/comments',
    //   route: CommentRoutes,
    // },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
