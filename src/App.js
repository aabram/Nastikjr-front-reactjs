import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Box, ColorModeProvider, CSSReset, Flex, theme, ThemeProvider,} from "@chakra-ui/core";
import Home from "./components/Home";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset/>
          <Flex justifyContent="center">
            <Box p={4} w="95%" maxWidth="770px" className="appBackground">
              <Router>
                <Box margin="auto" p={2} border="0px solid" className="content">
                  <Switch>
                    <Route path="/" component={Home}/>
                  </Switch>
                </Box>
              </Router>
            </Box>
          </Flex>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
