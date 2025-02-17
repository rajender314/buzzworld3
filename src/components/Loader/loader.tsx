import { PiSpinner } from "pixel-kit";
import LoaderContainer from "@app/components/Loader/loader-components";

function Loader() {
  return (
    <LoaderContainer>
      {/* <PiSpinner color="inherit" libraryType="atalskit" /> */}
      {/* <PiProgressIndicator
          appearance="primary"
          selectedIndex={1}
          size="large"
          spacing="comfortable"
          values={["first", "second", "third", "fourth"]}
        /> */}
      <PiSpinner color="primary" size={50} libraryType="atalskit" />
    </LoaderContainer>
  );
}

export default Loader;
