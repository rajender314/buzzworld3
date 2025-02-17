import { PiTypography } from "pixel-kit";
import {
  SecondaryHeaderContainer,
  LeftContent,
} from "../secondaryheader/secondaryheader.component";

export default function RolesSecondaryHeader({ pageLogo }: any) {
  return (
    <SecondaryHeaderContainer>
      <LeftContent>
        <img src={pageLogo} alt="loading" />
        <PiTypography className="page-label" component="h1">
          Admin
        </PiTypography>
      </LeftContent>
    </SecondaryHeaderContainer>
  );
}
