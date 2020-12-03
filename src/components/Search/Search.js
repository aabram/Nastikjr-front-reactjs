import React, { useContext, useState } from "react";
import Axios from "axios";
import "../../css/App.css";
import config from "../../config.json";
import Oops from "../Oops";
import Notfound from "../Notfound";
import Loading from "../Loading";
import Cancelled from "../Cancelled";
import AppContext from "../../AppContext";
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/core";
import About from "../About";
import Exact from "./ResultExact";
import Partial from "./ResultPartial";

function Search() {
  const appContext = useContext(AppContext);
  const APIurl = config.API_URL;
  const API_VER = config.API_VER;
  const API_Server_404_msg = config.API_server_404_msg;
  const API_server_network_error = config.API_server_network_error;
  const {colorMode} = useColorMode();
  const separator = ": ";

  const exactBgColor = { light: "gray.100", dark: "blue.900" };
  const exactTextColor = { light: "black", dark: "gray.200" };
  const markClass = { light: "mark-light", dark: "mark-dark" };

  const [networkError, setNetworkError] = useState(false);
  const [notFound404, setNotFound404] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState("");
  const [partial, setPartial] = useState([]);
  const [exact, setExact] = useState([]);
  const [langEN, setLang] = useState(true);

  const langClick = () => {
    setLang(!langEN);
    resetSearch();
  };

  const resetSearch = () => {
    setExact([]);
    setPartial([]);
    setSearchError(false);
    setLoading(false);
  };

  const onChangeEN = (e) => setWord(e.target.value);

  const onSubmitEN = (e) => {
    e.preventDefault();

    // Reset arrays and errors, otherwise we'll have old results lingering around
    // even if server is down, we deny search or any other error occurs
    setExact([]);
    setPartial([]);
    setNetworkError(false);
    setNotFound404(false);

    if (word.length < 3) {
      setSearchError(true);
      setLoading(false);
    } else {
      setLoading(true);
      setSearchError(false);
      performSearch();
    }

    appContext.toggleAbout(false);
  };

  const performSearch = () => {
    const axiosInstance = Axios.create({
      baseURL: APIurl + API_VER,
      headers: { "X-frontend-client": "Nastikjr-react" },
    });

    const searchExact = axiosInstance.get((langEN ? "/en/" : "/et/") + "exact/" + word);
    const searchPartial = axiosInstance.get((langEN ? "/en/" : "/et/") + word);

    Promise.all([searchExact, searchPartial])
      .then(
        Axios.spread((...responses) => {
          setExact(responses[0].data);
          setPartial(responses[1].data);

          if (responses[0].data.length > 0 || responses[1].data.length > 0) {
            setNoResults(false);
          } else {
            setNoResults(true);
          }

          setLoading(false);
        })
      )
      .catch((errors) => {
        if (errors.response) {
          setLoading(false);
          console.log(errors.response);
          console.log(errors.response.statusText);
          setNotFound404(errors.response.status.toString() === "404");
        } else {
          setLoading(false);
          setNetworkError(true);
          console.log("No connection to " + APIurl);
        }
      });
  };

  return (
    <>
      <form name="searchbox" onSubmit={onSubmitEN}>
        <Flex justifyContent="flex-start" py={2} border="0px solid">
          <InputGroup w="100%" size="sm">
            <InputLeftAddon
              children={langEN ? "EN" : "ET"}
              borderRightRadius="0"
              borderBottomColor="#aaa"
              borderLeftColor="#aaa"
              borderTopColor="#aaa"
              onClick={langClick}
              cursor="pointer"
            />
            <Input
              name="word"
              autoFocus
              variant="outline"
              borderRightColor="#aaa"
              borderTopColor="#aaa"
              borderBottomColor="#aaa"
              borderRadius="0"
              borderBottomRightRadius="md"
              borderTopRightRadius="md"
              value={word}
              onChange={onChangeEN}
              mr={2}
              px={2}
            />
            <InputRightElement
              size="md"
              children={<Icon name="small-close" color="gray.400" />}
              mx={2}
              onClick={() => {
                setWord("");
              }}
            />
          </InputGroup>
          <Button
            as="button"
            mt={0}
            type="submit"
            size="sm"
            variantColor="blue"
          >
            <Icon name="search" mx={1} />
          </Button>
        </Flex>
      </form>

      <About />

      {notFound404 && <Oops error={API_Server_404_msg}/>}

      {loading && <Loading/>}
      {networkError && <Oops error={API_server_network_error}/>}

      {searchError && <Cancelled/>}
      {noResults && <Notfound/>}

      {exact.length > 0 &&
      <Exact
        exact={exact}
        separator={separator}
        exactBgColor={exactBgColor}
        exactTextColor={exactTextColor}
        colorMode={colorMode}
        langEN={langEN}
      />}

      {partial.length > 0 &&
      <Partial
        partial={partial}
        word={word}
        searchError={searchError}
        separator={separator}
        markClass={markClass}
        colorMode={colorMode}
        langEN={langEN}
      />}
    </>
  );
}

export default Search;
