import React from "react";
import {Box, Text} from "@chakra-ui/core";

function ResultPartial(props) {
  return (
    <Box p={2} my={2}>
      {props.partial.map((row) => (
        <Text key={row.id.toString()}>
          <span title={"ID: " + row.id}>
            <strong
              dangerouslySetInnerHTML={{
                __html: (props.langEN ? row.en : row.et).replace(
                  new RegExp(props.word, "gi"),
                  (match) => `<mark class="${props.markClass[props.colorMode]}">${match}</mark>`
                ),
              }}
            ></strong>
          </span>
          {props.separator} <span>{props.langEN ? row.et : row.en}</span>
        </Text>
      ))}
    </Box>
  );
}

export default ResultPartial;
