import React, { useContext } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import AppContext from "../AppContext";
import Themeicon from "./UI/Themeicon";
import Abouticon from "./UI/Abouticon";

function Header() {
  const appContext = useContext(AppContext);
  let description = appContext.headerTextDirectionENET
    ? "Inglise → eesti sõnastik"
    : "Eesti → inglise sõnastik";

  return (
    <Box>
      <Flex justifyContent="space-between" px={2}>
        <Heading as="h1" size="md" pt={2}>
          Nastik jr
        </Heading>
        <Box>
          <Abouticon />
          <Themeicon />
        </Box>
      </Flex>
      <Flex justifyContent="flex-start" px={2} paddingBottom={1}>
        <Text fontSize="md">{description}</Text>
      </Flex>
    </Box>
  );
}

export default Header;
