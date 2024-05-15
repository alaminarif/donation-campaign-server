"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const admin_route_1 = require("../modules/admin/admin.route");
const donationCategory_route_1 = require("../modules/donationCategory/donationCategory.route");
const donation_route_1 = require("../modules/donation/donation.route");
const campaign_route_1 = require("../modules/campaign/campaign.route");
const comment_route_1 = require("../modules/comment/comment.route");
const blog_route_1 = require("../modules/blog/blog.route");
const payment_route_1 = require("../modules/payment/payment.route");
const rating_route_1 = require("../modules/rating/rating.route");
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
        path: '/donation-categories',
        route: donationCategory_route_1.DonationCategoryRoutes,
    },
    {
        path: '/donations',
        route: donation_route_1.DonationRoutes,
    },
    {
        path: '/campaigns',
        route: campaign_route_1.CampaignRoutes,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/payments',
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: '/ratings',
        route: rating_route_1.RatingRoutes,
    },
    {
        path: '/comments',
        route: comment_route_1.CommentRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
