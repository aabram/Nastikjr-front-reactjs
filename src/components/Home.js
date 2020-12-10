import React, {useState} from "react";
import AppContext from "../AppContext";
import Header from "./Header";
import Search from "./Search/Search";

function Home({match}) {
  // We need to be able to toggle About box not only in Header but in Search as well
  const [about, toggleAbout] = useState(false);
  const appSettings = {
    about,
    toggleAbout
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
