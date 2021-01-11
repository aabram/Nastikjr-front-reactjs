import React from 'react';
import {Text} from "@chakra-ui/core";

function Cancelled() {
  return (
    <React.Fragment>
      <Text my={2}>Otsing tühistatud. Liiga vähe tähti, sisesta vähemalt 3.</Text>
    </React.Fragment>
  );
}

export default Cancelled;
