import React from 'react';
import {CircularProgress, Flex} from "@chakra-ui/core";

function Loading() {
  return (
    <Flex justifyContent="left" p={2}>
      <CircularProgress isIndeterminate size="20px" marginRight={2}/> <p>Töö käib ...</p>
    </Flex>
  );
}

export default Loading;
