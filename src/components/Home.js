import React, {useState} from "react";
import AppContext from "../AppContext";
import Header from "./Header";
import Search from "./Search/Search";

function Home() {
  const [about, toggleAbout] = useState(false);

  const appSettings = {
    about,
    toggleAbout,
  };

  return (
    <>
      <AppContext.Provider value={appSettings}>
        <Header/>
        <Search/>
      </AppContext.Provider>
    </>
  );
}

export default Home;
