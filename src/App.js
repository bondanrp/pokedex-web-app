import "./App.scss";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/client";
import { Home } from "./views/home";
import { useEffect } from "react";
import { getMyPokemon } from "./helper/localstorage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import MyPokemon from "./views/my-pokemon";

function App() {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.graphcdn.app",
  });
  useEffect(() => {
    if (!getMyPokemon()) {
      localStorage.setItem("myPokemon", JSON.stringify([]));
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <main>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/my-pokemon">
              <MyPokemon />
            </Route>
          </Switch>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
