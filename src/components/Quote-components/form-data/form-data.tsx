import { PiLeftMenu } from "pixel-kit";
import { useState } from "react";
import RolesSecondaryHeader from "@app/components/RolesSecondaryHeader/roles-secondary-header";
// import { RoleHeadingDiv, RolesAndPermissionContainer } from "@app/components/userRolePermissions/user-role-permissions.component";
import { useHistory } from "react-router-dom";
import {
  RolesAndPermissionContainer,
  Permissions,
} from "@app/components/userRolePermissions/user-role-permissions.component";
import SampleForm from "@app/components/popups/client-approval-form/sample-form/sample-form";
import SideMenuList from "@app/components/sidelist";
import {
  Header,
  SideMenuContainer,
} from "../../commonLayout/commonLayout.component";

export default function Formdata({ sideNavData, props }: any) {
  const history = useHistory();
  // const [activeRole, setActiveRole] = useState("all");
  // let [rolesList, setRolesList] = useState([]);
  const [active, setActive] = useState("form");
  const sidemenuList = sideNavData;
  function onItemClick(obj: any) {
    setActive(obj.key);
    history.push(`/${obj.key}`);
  }

  return (
    <>
      <Header>
        <RolesSecondaryHeader pageLogo={props.pageLogo} />
      </Header>
      <RolesAndPermissionContainer>
        <SideMenuContainer>
          <SideMenuList isActive={active} className=" menu-list">
            <PiLeftMenu
              activeKey={active}
              onMenuClick={(e) => onItemClick(e)}
              options={sidemenuList}
            />
          </SideMenuList>
        </SideMenuContainer>

        <Permissions>
          <SampleForm />
        </Permissions>
      </RolesAndPermissionContainer>
    </>
  );
}
