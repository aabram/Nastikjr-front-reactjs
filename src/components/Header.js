import React from "react";
import {Box, Flex, Heading, Text} from "@chakra-ui/core";
import Themeicon from "./Themeicon";
import Abouticon from "./Abouticon";

function Header() {
  return (
    <>
      <Box>
        <Flex justifyContent="space-between" px={2}>
          <Heading as="h1" size="md" pt={2}>
            Nastik jr
          </Heading>
          <Box>
            <Abouticon/>
            <Themeicon/>
          </Box>
        </Flex>
        <Flex justifyContent="flex-start" px={2} paddingBottom={1}>
          <Text fontSize="md">Inglise ↔ eesti sõnastik</Text>
        </Flex>
      </Box>
    </>
  );
}

export default Header;
