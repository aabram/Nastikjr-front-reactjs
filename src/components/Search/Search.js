import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {Button, Flex, Icon, Input, InputGroup, InputLeftAddon, InputRightElement, useColorMode,} from "@chakra-ui/core";
import AppContext from "../../AppContext";
import "../../css/App.css";
import Config from "../../config.json";
import Oops from "../Notices/Oops";
import Notfound from "../Notices/Notfound";
// import Loading from "../Loading";
import Cancelled from "../Notices/Cancelled";
import About from "../About";
import ResultExact from "./ResultExact";
import ResultPartial from "./ResultPartial";
import * as PropTypes from "prop-types";

function Search(props) {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const {colorMode} = useColorMode();
  const API_URL = Config.API_URL;
  const API_VER = Config.API_VER;
  const API_Server_404_msg = Config.API_server_404_msg;
  const API_server_network_error = Config.API_server_network_error;
  const separator = ": ";

  const exactBgColor = {light: "gray.100", dark: "blue.900"};
  const exactTextColor = {light: "black", dark: "gray.200"};
  const markClass = {light: "mark-light", dark: "mark-dark"};

  const [word, setWord] = useState(props.word);
  const [lang, setLang] = useState(props.lang);
  const [networkError, setNetworkError] = useState(false);
  const [notFound404, setNotFound404] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchError, setSearchError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [partial, setPartial] = useState([]);
  const [exact, setExact] = useState([]);

  // We want to know if page is loaded from link/url or not
  const fromLink = (props.lang && props.word);

  // On search direction change
  const langClick = () => {
    setLang(lang === 'en' ? 'et' : 'en');
    appContext.toggleHeaderTextDirectionENET(!appContext.headerTextDirectionENET);
    resetSearch();
  };

  // Reset fields and values to start with empty page
  const resetSearch = () => {
    setExact([]);
    setPartial([]);
    setSearchError(false);
    // setLoading(false);
  };

  // On form input field change
  const onChangeEN = (e) => setWord(e.target.value);

  // On form submit
  const onSubmitEN = (e) => {
    e.preventDefault();
    appContext.toggleAbout(false);

    // Reset arrays and errors, otherwise we'll have old results lingering around
    // even if server is down, we deny search or any other error occurs
    setExact([]);
    setPartial([]);
    setNetworkError(false);
    setNotFound404(false);

    preflight();
  };

  // Conditions for accepting or denying search
  const preflight = () => {
    if (word.length < 3) {
      setSearchError(true);
      // setLoading(false);
    } else {
      // setLoading(false);
      setSearchError(false);
      performSearch();
    }
  }

  // Search with provided lang and word
  // We should get to this point only if all conditions are met:
  // lang, word are set and minlength has been enforced
  const performSearch = () => {
    const axiosInstance = Axios.create({
      baseURL: API_URL + API_VER,
      headers: {"X-frontend-client": "Nastikjr-react"},
    });
    const searchExact = axiosInstance.get(lang + "/exact/" + word);
    const searchPartial = axiosInstance.get(lang + "/" + word);

    Promise.all([searchExact, searchPartial])
      .then(
        Axios.spread((...responses) => {
          setExact(responses[0].data);
          setPartial(responses[1].data);
          // setLoading(false);

          if (responses[0].data.length > 0 || responses[1].data.length > 0) {
            setNoResults(false);
          } else {
            setNoResults(true);
          }
        })
      )
      .catch((errors) => {
        if (errors.response) {
          // setLoading(false);
          console.log(errors.response);
          console.log(errors.response.statusText);
          setNotFound404(errors.response.status.toString() === "404");
        } else {
          // setLoading(false);
          setNetworkError(true);
          console.log("No connection to " + API_URL);
        }
      });
    updateURL();
  };

  // Update URL in browser to enable linking to specific search
  // This will work OOB with npm start, but for use with webserver
  // we need to enable rewrite and redirect support.
  const updateURL = () => {
    let newURL = "/" + lang + "/" + word;
    history.push(newURL);
  }

  // On component load check if we come here from link (eg http://.../en/cat)
  // if yes then do preflight (and search) immediately
  useEffect(() => {
    if (fromLink) {
      preflight();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <form name="searchbox" onSubmit={onSubmitEN}>
        <Flex justifyContent="flex-start" py={2} border="0px solid">
          <InputGroup w="100%" size="sm">
            <InputLeftAddon
              children={lang.toUpperCase()}
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
              children={<Icon name="small-close" color="gray.400"/>}
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
            <Icon name="search" mx={1}/>
          </Button>
        </Flex>
      </form>

      <About/>

      {notFound404 && <Oops error={API_Server_404_msg}/>}

      {/* {loading && <Loading/>} */}
      {networkError && <Oops error={API_server_network_error}/>}

      {searchError && <Cancelled/>}
      {noResults && <Notfound/>}

      {exact.length > 0 && <ResultExact
        exact={exact}
        separator={separator}
        exactBgColor={exactBgColor}
        exactTextColor={exactTextColor}
        colorMode={colorMode}
        lang={lang}
      />}

      {partial.length > 0 && <ResultPartial
        partial={partial}
        word={word}
        searchError={searchError}
        separator={separator}
        markClass={markClass}
        colorMode={colorMode}
        lang={lang}
      />}
    </>
  );
}

export default Search;

Search.propTypes = {
  lang: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired
}
