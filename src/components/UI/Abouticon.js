import React, { useContext } from "react";
import { IconButton } from "@chakra-ui/core";
import AppContext from "../../AppContext";

function Abouticon() {
  const appContext = useContext(AppContext);
  return (
    <IconButton
      icon="question"
      variant="ghost"
      aria-label="About"
      onClick={() => {
        appContext.toggleAbout(!appContext.about);
      }}
    />
  );
}

export default Abouticon;
