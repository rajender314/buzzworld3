import {PiSectionMessage} from "pixel-kit";
import React from "react";
type Props = {
  appearance: string | any;
  message: string;
};
const Snackbar = (props: Props) => {
  return (
    <>
      <PiSectionMessage appearance={props.appearance} title={props.message}>
        <span></span>
      </PiSectionMessage>
    </>
  );
};

export default Snackbar;
