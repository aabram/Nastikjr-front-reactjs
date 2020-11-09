import React, {useContext} from "react";
import {Box, Text, useColorMode} from "@chakra-ui/core";
import AppContext from "../AppContext";

function About() {
  const appContext = useContext(AppContext);

  const {colorMode} = useColorMode();
  const bgColor = {light: "blue.400", dark: "blue.800"};
  const color = {light: "white", dark: "gray.200"};

  const legacyURL = "https://nastik.palat.ee";
  const EKIURL = "http://www.eki.ee/dict/ies/";
  const email = "mailto:aabram@gmail.com?Subject=Nastikjr"

  return (
    <>
      <Box
        as="div"
        rounded="md"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        p={4}
        mb={2}
        display={appContext.about ? "block" : "none"}
      >
        <Text fontSize="md">
          Nastik jr on <a href={legacyURL} className="link">Nastiku</a> arendusjärgus olev uusversioon.
          <br/>
          Kasutusel on <a href={EKIURL} className="link">EKI</a> koostatud sõnabaas.
          <br/><br/>
          Otsing töötab mõlemal suunal, kuid esineb veel mõningaid puudujääke (nt automaatne ümbersuunamine
          paralleelvormidele).
          <br/>
          Võib anda <a href={email} className="link">tagasisidet</a>.
        </Text>
      </Box>
    </>
  );
}

export default About;
