import React from 'react';
import {Box} from '@chakra-ui/core';


function Oops() {
  const APIErrorMessage = "Andmebaasiserver ei vasta. Proovi mõne aja pärast uuesti.";

  return (
    <>
      <Box bg="tomato" color="white" rounded="md" p={2} m={2}>
        {APIErrorMessage}
      </Box>
    </>
  );
}

export default Oops;
