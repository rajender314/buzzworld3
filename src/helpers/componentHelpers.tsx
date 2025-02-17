import {
  getLocalStorage,
  setLocalStorage,
} from "@app/core/localStorage/localStorage";
import {
  QuoteSideList,
  sideList,
} from "@app/modules/organisations/component/organisationRenderdata";
import { GlobalUserPermissions } from "./helpers";

/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
    }
}]  */

/**
 * @param {string} props required params
 * @return {any} props
 */
export function saveFilter(props: any) {
  return props;
}
let isAllowed: any;

/**
 * @param {string} label required params
 * @return {any} a new row
 */
async function getPerData(label: string, permissionType: string) {
  // await userPermissions()
  let userPerm: any = await getLocalStorage("userPermission");
  userPerm = userPerm ? JSON.parse(userPerm) : null;
  const tifOptions: any = [];
  if (userPerm) {
    Object.keys(userPerm.permissions).forEach((key) => {
      tifOptions.push(userPerm.permissions[key]);
    });
  }
  userPerm = tifOptions;
  userPerm.map((obj: any, index: number) => {
    if (
      Object.prototype.hasOwnProperty.call(obj, label) &&
      userPerm[index][label]
    ) {
      isAllowed = obj[label][permissionType];
    }

    return userPerm;
  });
  return isAllowed;
}
/**
 * @param {string} label required params
 * @return {any} a new row
 */
export async function getUserPermissions(
  label: string,
  permissionType: string
) {
  const a = await getPerData(label, permissionType);
  return a;
}

/**
 * @param {string} label required params
 * @return {any} a new row
 */
export async function getPermissionObject(label: string) {
  // console.log(label)
  let userPerm: any = getLocalStorage("userPermission");
  userPerm = userPerm ? JSON.parse(userPerm) : null;
  let userObject = {};
  const tifOptions: any = [];
  Object.keys(userPerm.permissions).forEach((key) => {
    tifOptions.push(userPerm.permissions[key]);
  });

  userPerm.permissions = tifOptions;
  // console.log(userPerm)

  if (userPerm.permissions) {
    userPerm.permissions.map((obj: any, index: number) => {
      if (
        Object.prototype.hasOwnProperty.call(obj, label) &&
        userPerm.permissions[index][label]
      ) {
        userObject = userPerm.permissions[index][label];
        // console.log(userObject)
      } else {
        return {};
      }
      userObject = userPerm.permissions[index][label];
      return userObject;
    });
    return userObject;
  }
  return userObject;
}

/**
 * @return {any} a new row
 */
export async function getAdminMenuList() {
  let updatedSideList = [];
  let userPerm: any = await GlobalUserPermissions();
  setLocalStorage("userPermission", userPerm);
  // let userPerm: any = await getLocalStorage('userPermission')
  userPerm = userPerm ? JSON.parse(userPerm) : null;
  const tifOptions: any = [];
  if (userPerm) {
    Object.keys(userPerm.permissions).forEach((key) => {
      tifOptions.push(userPerm.permissions[key]);
    });
    updatedSideList = sideList.map((obj: any) => {
      tifOptions.map(async (ele: any) => {
        if (Object.prototype.hasOwnProperty.call(ele, obj.key)) {
          obj.display = await ele[obj.key].View;
        }
        // if (obj.key === "qc_control") {
        //  obj.display = true;
        // }
        return ele;
      });
      return obj;
    });
  }
  return updatedSideList;
}
/**
 * @return {any} a new row
 */
export async function getQuotesMenuList() {
  let updatedSideList = [];
  let userPerm: any = await GlobalUserPermissions();

  // let userPerm: any = await getLocalStorage('userPermission')
  userPerm = userPerm ? JSON.parse(userPerm) : null;
  const tifOptions: any = [];
  if (userPerm) {
    Object.keys(userPerm.permissions).forEach((key) => {
      tifOptions.push(userPerm.permissions[key]);
    });
    updatedSideList = QuoteSideList.map((obj: any) => {
      tifOptions.map(async (ele: any) => {
        if (Object.prototype.hasOwnProperty.call(ele, obj.key)) {
          obj.display = await ele[obj.key].View;
        }
        // if (obj.key === "qc_control") {
        //  obj.display = true;
        // }
        return ele;
      });
      return obj;
    });
  }
  return updatedSideList;
}
