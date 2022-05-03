export const sideList = [
  {
    key: "account-type",
    label: "Account Type"
  },
  {
    key: "classification",
    label: "Classification"
  },
  {
    key: "industry",
    label: "Industry"
  },
  {
    key: "sales_potential",
    label: "SalesPotential"
  },
  {
    key: "contact_types",
    label: "Contact Types"
  },
  {
    key: "po_min_qty",
    label: "PO Min Qty"
  }
];

export const primaryHeaderOptions = [
  {
    key: "/dashboard",
    label: "Dashboard"
  },
  {
    children: [
      {
        key: "/create",
        label: "Create"
      },
      {
        key: "/edit",
        label: "Edit"
      }
    ],
    key: "/quotes",
    label: "Quotes"
  },
  {
    key: "/repairs",
    label: "Repairs"
  },
  {
    key: "/orders",
    label: "Orders"
  },
  {
    key: "/invoices",
    label: "Invoices"
  },
  {
    key: "/organisations",
    label: "Organizations",
    children: [
      {
        key: "/organisations",
        label: "Organizations"
      },
      {
        key: "/contacts",
        label: "Contacts"
      }
    ]
  },
  {
    key: "/account-type",
    label: "Admin"
  },
  {
    key: "/pricing",
    label: "Pricing",
    children: [
      {
        key: "/pricing",
        label: "Pricing"
      },
      {
        key: "/discount-codes",
        label: "Discount Codes"
      },
      {
        key: "/special-pricing",
        label: "Special Pricing"
      }
    ]
  }
];

export const profileOptions = [
  {
    id: "logout",
    name: "Logout",
    route: "",
    url: ""
  }
];
