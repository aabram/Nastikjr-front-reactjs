import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/core";

function Themeicon() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? "moon" : "sun"}
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle light/dark theme"
    />
  );
}

export default Themeicon;
