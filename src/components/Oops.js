import React from 'react';
import {Box} from '@chakra-ui/core';


function Oops(props) {

  return (
    <>
      <Box bg="tomato" color="white" rounded="md" p={2} m={2}>
        {props.error}
      </Box>
    </>
  );
}

export default Oops;
