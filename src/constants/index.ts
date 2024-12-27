const PUBLIC_ROUTE = [
    "/auth/login",
    "/auth/signup",
    "/auth/onboarding",
    "/auth/confirm-otp",
    "/auth/congratulations",
    "/auth/set-password",
    "/auth/forgot-password",
    "/auth/confirm-otp",
    "/auth/congratulations",
];

const PROTECTED_ROUTE = [
    //bids
    "/api/v1/bids",
    "/api/v1/bids/manage-bid",
    "/api/v1/bids/bid-placement",
    "/api/v1/bids/manage-bid-placement",
    //Fx
    "/api/v1/fx",
    "/api/v1/fx/add-new-fx",
    "/api/v1/fx/add-fx-vendor",
    "/api/v1/fx/fetch-fx-bid-placement",
    "/api/v1/fx/fetch-fx",
    "/api/v1/fx/fx-vendors",
    "/api/v1/fx/fx-bidders",
    "/api/v1/fx/manage-fx-bids",
    "/api/v1/fx/manage-fx",
    "/api/v1/fx/send-fx-bids",
    "/api/v1/fx/send-fx-user-bid",
    //Settings
    "/api/v1/settings",
    //Tenders
    "/api/v1/tenders",
    "/api/v1/tenders/add-tender",
    "/api/v1/tenders/extend-end-date",
    "/api/v1/tenders/manage-tender",
    "/api/v1/tenders/send-tender",
    "/api/v1/tenders/verify-otp",
    //Vendors
    "/api/v1/vendors",
    "/api/v1/vendors/add-vendor",
    "/api/v1/vendors/manage-vendor",
    "/api/v1/vendors/verify",
    //Cron
    "/api/v1/cron/check-fx-status",
    "/api/v1/cron/check-tender-status",
];

const Headers = {
    "x-pol-rfx-secret": process.env.X_POL_RFX_SECRET,
    "Content-Type": "application/json",
};

const HEADER_TOKEN = Headers["x-pol-rfx-secret"];

const DOCUMENTS_URL = process.env.BUCKET_PUBLIC_DOMAIN;

export {
    PROTECTED_ROUTE,
    PUBLIC_ROUTE,
    Headers,
    DOCUMENTS_URL,
    HEADER_TOKEN
}