const getProps = (path: string) => {
  switch (path) {
    case "account-type": {
      return {
        pageLabel: "Account_Types",
        displayLabel: "Account Type",
        gridName: "Admin",
      };
    }
    case "branches": {
      return {
        pageLabel: "Branches",
        displayLabel: "Branches",
        gridName: "Admin",
      };
    }
    case "classification": {
      return {
        pageLabel: "Classifications",
        displayLabel: "Classification",
        gridName: "Admin",
      };
    }
    case "contact_types": {
      return {
        pageLabel: "Contact_Types",
        displayLabel: "Contact Type",
        gridName: "Admin",
      };
    }
    case "industry": {
      return {
        pageLabel: "Industry",
        displayLabel: "Industry",
        gridName: "Admin",
      };
    }
    case "po_min_qty": {
      return {
        pageLabel: "PO_Min_Qty",
        displayLabel: "PO Min Qty",
        gridName: "Admin",
      };
    }
    case "quote-approval": {
      return {
        pageLabel: "quote-approval",
        displayLabel: "Quote Approval",
        gridName: "Admin",
      };
    }
    case "quote-type": {
      return {
        pageLabel: "quote-type",
        displayLabel: "Quote Type",
        gridName: "Admin",
      };
    }
    case "sales_potential": {
      return {
        pageLabel: "Sales_Potential",
        displayLabel: "Sales Potential",
        gridName: "Admin",
      };
    }
    case "vendors": {
      return {
        pageLabel: "Vendors",
        displayLabel: "Vendor",
        gridName: "Admin",
      };
    }
    case "regions": {
      return {
        pageLabel: "Regions",
        displayLabel: "Regions",
        gridName: "Admin",
      };
    }
    case "territory": {
      return {
        pageLabel: "Territory",
        displayLabel: "Territories",
        gridName: "Admin",
      };
    }
    case "warehouse": {
      return {
        pageLabel: "Warehouse",
        displayLabel: "Warehouse",
        gridName: "Admin",
      };
    }
    case "product_class": {
      return {
        pageLabel: "product_class",
        displayLabel: "Product Class",
        gridName: "Admin",
      };
    }

    case "zipcodes": {
      return {
        pageLabel: "Zipcodes",
        displayLabel: "Zip Codes",
        gridName: "Admin",
      };
    }
    case "users": {
      return {
        pageLabel: "users",
        displayLabel: "Users",
        gridName: "Admin",
      };
    }
    case "user_roles": {
      return {
        pageLabel: "user_roles",
        displayLabel: "User Roles",
        gridName: "Admin",
      };
    }
    case "terms-conditions": {
      return {
        pageLabel: "terms-conditions",
        displayLabel: "Terms Conditions",
        gridName: "Admin",
      };
    }
    case "qc_control": {
      return {
        pageLabel: "qc_control",
        displayLabel: "QC Forms",
        gridName: "Admin",
      };
    }
    case "product_category": {
      return {
        pageLabel: "product_category",
        displayLabel: "Product Category",
        gridName: "Admin",
      };
    }
    default: {
      return {
        pageLabel: "Account_Types",
        displayLabel: "Account Type",
        gridName: "Admin",
      };
    }
  }
};

export default getProps;
