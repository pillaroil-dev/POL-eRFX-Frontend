export const menu = {
  admin: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/admin" },
      { id: 2, name: "Vendors", icon: "majesticons:user", link: "/u/admin/vendors" },
      { id: 3, name: "Tenders", icon: "majesticons:analytics", link: "/u/admin/tenders" },
      // { id: 4, name: "Bids", icon: "majesticons:article", link: "/u/admin/bids" },
      { id: 5, name: "Report", icon: "majesticons:noteblock-text", link: "/u/admin/report" },
    ],
    lower: [
      { id: 6, name: "Settings", icon: "majesticons:cog", link: "/u/admin/settings" },
    ]
  },
  operator: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/operator" },
      // { id: 2, name: "Vendors", icon: "majesticons:user", link: "/u/operator/vendors" },
      { id: 3, name: "Tenders", icon: "majesticons:analytics", link: "/u/operator/tenders" },
      { id: 4, name: "Bids", icon: "majesticons:article", link: "/u/operator/bids" },
      { id: 5, name: "Report", icon: "majesticons:noteblock-text", link: "/u/operator/report" },
    ],
    lower: [
      // { id: 6, name: "Settings", icon: "majesticons:cog", link: "/u/operator/settings" },
    ]
  },
  user: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/user" },
      { id: 2, name: "Tenders", icon: "majesticons:analytics", link: "/u/user/tenders" },
      // { id: 3, name: "Report", icon: "majesticons:noteblock-text", link: "/u/user/report" },
    ],
    lower: [
      // { id: 4, name: "Settings", icon: "majesticons:cog", link: "/u/user/settings" },
      // { id: 5, name: "Logout", icon: "majesticons:logout", link: "/api/auth/logout" },
    ]
  },
  fx: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/fx-operator" },
      { id: 2, name: "Fx", icon: "majesticons:analytics", link: "/u/fx-operator/fx" },
      { id: 3, name: "Bids", icon: "majesticons:article", link: "/u/fx-operator/bids" },
      // { id: 4, name: "Report", icon: "majesticons:noteblock-text", link: "/u/fx/report" },
    ],
    lower: [
      // { id: 4, name: "Settings", icon: "majesticons:cog", link: "/u/fx/settings" },
    ]
  },
  fxAdmin: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/fx-admin" },
      { id: 2, name: "Vendors", icon: "majesticons:user", link: "/u/fx-admin/vendors" },
      { id: 3, name: "Bids", icon: "majesticons:article", link: "/u/fx-admin/bids" },
      // { id: 4, name: "Report", icon: "majesticons:noteblock-text", link: "/u/fx-admin/report" },
    ],
    lower: [
      // { id: 4, name: "Settings", icon: "majesticons:cog", link: "/u/fx/settings" },
    ]
  },
  fxUser: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/fx-user" },
      { id: 3, name: "Report", icon: "majesticons:noteblock-text", link: "/u/fx-user/report" },
    ],
    lower: [
    ]
  },
} as const;

