import React from "react";
import { Text } from "@chakra-ui/core";
import "../../css/App.css";
import { string } from "prop-types";

function Notfound(props) {
  const direction =
    props.lang === "en"
      ? ["Inglise → eesti", "Eesti → inglise", "/et/" + props.word]
      : ["Eesti → inglise", "Inglise → eesti", "/en/" + props.word];

  return (
    <Text my={2}>
      Ei leidnud midagi.
      <br />
      Otsisid suunal <em>{direction[0]}</em>, kas tahad proovida otsida suunal{" "}
      <a className="link" href={direction[2]}>
        {direction[1]}
      </a>
      ?
    </Text>
  );
}

export default Notfound;

Notfound.propTypes = {
  lang: string.isRequired,
  word: string.isRequired,
};
