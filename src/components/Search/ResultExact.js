import React from "react";
import {Text} from "@chakra-ui/core";

function ResultExact(props) {
  return (
    <>
      {props.exact.map((row) => (
        <Text className="exact" key={row.id.toString()} p={2} my={2} rounded="md"
              bg={props.exactBgColor[props.colorMode]}
              color={props.exactTextColor[props.colorMode]}>
          <span title={"ID: " + row.id}>
            <strong className="exactMatch">{props.lang === 'en' ? row.en : row.et}</strong>{props.separator}
          </span>
          <span>{props.lang === 'en' ? row.et : row.en}</span>
        </Text>
      ))}
    </>
  );
}

export default ResultExact;
