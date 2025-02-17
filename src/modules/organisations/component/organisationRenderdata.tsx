import {
  LinkWithIcon,
  ImgTag,
} from '@app/components/secondaryheader/secondaryheader.component';
import QuotesImg from '@app/assets/images/quotes.svg';
import RepairsImg from '@app/assets/images/repairs.svg';
import Jobs from '@app/assets/images/Jobs-logo.svg';
import PartsPurchase from '@app/assets/images/partsPurchase.svg';

export const sideList = [
  {
    key: 'account-type',
    label: 'Account Types',
    display: true,
  },
  {
    key: 'branches',
    label: 'Branches',
    display: true,
  },
  {
    key: 'classification',
    label: 'Classifications',
    display: true,
  },
  {
    key: 'contact_types',
    label: 'Contact Types',
    display: true,
  },
  {
    key: 'industry',
    label: 'Industries',
    display: true,
  },
  {
    key: 'po_min_qty',
    label: 'PO Min Qty',
    display: true,
  },
  {
    key: 'product_category',
    label: 'Product Category',
    display: true,
  },
  {
    key: 'product_class',
    label: 'Product Class',
    display: true,
  },

  {
    key: 'qc_control',
    label: 'QC Forms',
    display: true,
  },
  {
    key: 'quote-approval',
    label: 'Quote Approval',
    display: true,
  },
  {
    key: 'quote-type',
    label: 'Quote Types',
    display: true,
  },

  {
    key: 'regions',
    label: 'Regions',
    display: true,
  },

  {
    key: 'sales_potential',
    label: 'Sales Potential',
    display: true,
  },
  {
    key: 'terms-conditions',
    label: 'Terms Conditions',
    display: true,
  },
  {
    key: 'territory',
    label: 'Territories',
    display: true,
  },

  {
    key: 'users',
    label: 'Users',
    display: true,
  },

  {
    key: 'user_roles',
    label: 'User Roles',
    display: true,
  },

  {
    key: 'vendors',
    label: 'Vendors',
    display: true,
  },
  {
    key: 'warehouse',
    label: 'Warehouse',
    display: true,
  },
  {
    key: 'zipcodes',
    label: 'Zip Codes',
    display: true,
  },
];

export const RepairSideList = [
  {
    key: 'my-repairs',
    label: 'My Repair Requests',
    display: true,
  },
  {
    key: 'repair-request',
    label: 'All Repairs Requests',
    display: true,
  },
];
export const RepairStatuses = [
  {
    key: 'receiving',
    label: 'Receiving',
    display: true,
  },
  {
    key: 'check_in',
    label: 'Check In',
    display: true,
  },
  {
    key: 'evaluation',
    label: 'Evaluation',
    display: true,
  },
  {
    key: 'pending_quote',
    label: 'Pending Quote',
    display: true,
  },
  {
    key: 'added_to_quote',
    label: 'Pending Approval',
    display: true,
  },
  {
    key: 'repair_in_progress',
    label: 'Repair in progress',
    display: true,
  },
  {
    key: 'qc',
    label: 'QC',
    display: true,
  },

  {
    key: 'billing',
    label: 'Billing',
    display: true,
  },

  // {
  //   key: "shipped",
  //   label: "Shipped",
  //   display: true,
  // },

  // {
  //   key: "waiting_on_parts",
  //   label: "Waiting on Parts",
  //   display: true,
  // },
];

export const primaryHeaderOptions = [
  {
    key: 'organizations',
    label: 'Organizations',
    display: false,
    children: [
      {
        key: 'organizations',
        label: (
          <div className="Button-Icon-Display">
            <LinkWithIcon className="Icon-space">
              <span className="link-icon-text">Organizations</span>
            </LinkWithIcon>
          </div>
        ),
        display: false,
      },
      {
        key: 'contacts',
        label: (
          <div className="Button-Icon-Display">
            <LinkWithIcon className="Icon-space">
              <span className="link-icon-text">Contacts</span>
            </LinkWithIcon>
          </div>
        ),
        display: false,
      },
    ],
  },
  {
    key: 'account-type',
    label: 'Admin',
    display: false,
  },
  {
    key: 'pricing',
    label: 'Pricing',
    display: false,
    children: [
      {
        key: 'pricing',
        label: (
          <div className="Button-Icon-Display">
            <LinkWithIcon className="Icon-space">
              <span className="link-icon-text">Pricing</span>
            </LinkWithIcon>
          </div>
        ),
        display: false,
      },
      {
        key: 'discount-codes',
        label: (
          <div className="Button-Icon-Display">
            <LinkWithIcon className="Icon-space">
              <span className="link-icon-text">Discount Codes</span>
            </LinkWithIcon>
          </div>
        ),
        display: false,
      },
      {
        key: 'special-pricing',
        label: (
          <div className="Button-Icon-Display">
            <LinkWithIcon className="Icon-space">
              <span className="link-icon-text">Non Standard Pricing</span>
            </LinkWithIcon>
          </div>
        ),
        display: false,
      },
    ],
  },
  {
    key: 'my-repairs',
    label: 'Repairs',
    display: true,
  },
  {
    key: 'all_quotes',
    label: 'Quotes',
    display: true,
  },

  {
    key: 'jobs',
    label: 'Jobs',
    display: true,
  },
  {
    key: 'orders',
    label: 'Orders',
    display: true,
  },

  { key: 'part-purchase', label: 'Parts Purchase', display: true },
  {
    key: 'inventory',
    label: 'Inventory',
    display: true,
  },
  {
    key: 'reports',
    label: 'Reports',
    display: false,
    children: [
      {
        key: 'past-due-invoices',
        label: (
          <div className="Button-Icon-Display">
            <LinkWithIcon className="Icon-space">
              <span className="link-icon-text">Past Due Invoices</span>
            </LinkWithIcon>
          </div>
        ),
        display: true,
      },
      {
        key: 'point-of-sales',
        label: (
          <div className="Button-Icon-Display">
            <LinkWithIcon className="Icon-space">
              <span className="link-icon-text">Point of Sales</span>
            </LinkWithIcon>
          </div>
        ),
        display: true,
      },
    ],
  },
];

export const profileOptions = [
  {
    id: 'user_profile',
    name: (
      <div className="Button-Icon-Display">
        <LinkWithIcon className="Icon-space">
          <span className="link-icon-text">User Profile</span>
        </LinkWithIcon>
      </div>
    ),
    route: '',
    url: '',
  },
  {
    id: 'logout',
    name: (
      <div className="Button-Icon-Display">
        <LinkWithIcon className="Icon-space">
          <span className="link-icon-text">Logout</span>
        </LinkWithIcon>
      </div>
    ),
    route: '',
    url: '',
  },
];

export const headerDropdownOptions = [
  {
    id: 1,
    name: (
      <div className="Button-Icon-Display">
        <LinkWithIcon className="Icon-space">
          <ImgTag src={RepairsImg} className="header-create-option-img" />
          <span className="link-icon-text">RMA</span>
        </LinkWithIcon>
      </div>
    ),
    module: 'repairs',
    display: true,
  },
  {
    id: 2,
    name: (
      <div className="Button-Icon-Display">
        <LinkWithIcon className="Icon-space">
          <ImgTag src={QuotesImg} className="header-create-option-img" />
          <span className="link-icon-text">Quote</span>
        </LinkWithIcon>
      </div>
    ),
    module: 'quotes',
    display: true,
  },
  {
    id: 3,
    name: (
      <div className="Button-Icon-Display">
        <LinkWithIcon className="Icon-space">
          <ImgTag src={Jobs} className="header-create-option-img" />
          <span className="link-icon-text">Job</span>
        </LinkWithIcon>
      </div>
    ),
    display: true,
    module: 'jobs',
  },
  {
    id: 3,
    name: (
      <div className="Button-Icon-Display">
        <LinkWithIcon className="Icon-space">
          <ImgTag src={PartsPurchase} className="header-create-option-img" />
          <span className="link-icon-text">Parts Purchase </span>
        </LinkWithIcon>
      </div>
    ),
    display: true,
    module: 'part-purchase',
  },
];
// export const quoteHeaderDropdown = [
//  {
//    id: 1,
//    name: (
//      <div className="Button-Icon-Display">
//        <LinkWithIcon className="Icon-space">
//          <span className="link-icon-text">Quote for repair</span>
//        </LinkWithIcon>
//      </div>
//    ),
//    display: true,
//  },
// ]

export const QuoteSideList = [
  {
    key: 'all_quotes',
    label: 'All Quotes',
    display: true,
  },
  {
    key: 'quote_for_parts',
    label: 'Parts Quotes',
    display: true,
  },
  {
    key: 'quote_for_repair',
    label: 'Repair Quotes',
    display: true,
  },
  {
    key: 'system_quotes',
    label: 'System Quotes',
    display: true,
  },
  {
    key: 'quote_expired',
    label: 'Expired Quotes',
    display: true,
  },
  {
    key: 'quote_archived',
    label: 'Archived Quotes',
    display: true,
  },
  {
    key: 'waiting_on_me',
    label: 'Waiting On Me',
    display: true,
  },
  {
    key: 'quoted_by',
    label: 'Quoted By Me',
    display: true,
  },
  {
    key: 'quotes_for_my_customers',
    label: 'My Customer Quotes',
    display: false,
  },
];
export const JobsSideList = [
  // {
  //   key: 'repair_jobs',
  //   label: 'Repair Jobs',
  // },
  {
    key: 'all_jobs',
    label: 'All Jobs',
    display: true,
  },
  // {
  //   key: 'systems_integration',
  //   label: 'Systems Integration',
  // },
  // {
  //   key: 'field_service',
  //   label: 'Field Service',
  // },
  // {
  //   key: 'jobs_assigned_to_me',
  //   label: 'Jobs Assigned to me',
  // },
];
export const PartsPurchaseSideList = [
  // { key: "my_requests", label: "My Requests" },
  { key: 'part-purchase', label: 'All Requests' },
];

export const PartsPurchaseStatuses = [
  {
    key: 'requested',
    label: 'Requested',
    display: false,
  },
  {
    key: 'ordered',
    label: 'Ordered',
    display: false,
  },
  {
    key: 'partially_received',
    label: 'Partially Received',
    display: false,
  },
  {
    key: 'received_and_completed',
    label: 'Received and Completed',
    display: false,
  },
  {
    key: 'cancelled',
    label: 'Cancelled',
    display: false,
  },
];
