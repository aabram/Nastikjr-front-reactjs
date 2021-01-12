import React, {useState} from "react";
import AppContext from "../AppContext";
import Header from "./Header";
import Search from "./Search/Search";
import * as PropTypes from "prop-types";

function Home({match}) {
  // We need to be able to toggle About box not only in Header but in Search as well
  const [about, toggleAbout] = useState(false);
  const [headerTextDirectionENET, toggleHeaderTextDirectionENET] = useState(true);
  const appSettings = {
    about,
    toggleAbout,
    headerTextDirectionENET,
    toggleHeaderTextDirectionENET
  };

  // If router provides us with {match} then use those
  let lang = match.params.lang==='en' || match.params.lang==='et' ? match.params.lang : 'en';
  let word = match.params.word ? match.params.word : '';

  return (
    <>
      <AppContext.Provider value={appSettings}>
        <Header/>
        <Search lang={lang} word={word}/>
      </AppContext.Provider>
    </>
  );
}

export default Home;

Home.propTypes = {
  match: PropTypes.object.isRequired
}
