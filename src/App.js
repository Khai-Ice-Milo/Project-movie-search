import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import SimpleBottomNavigation from "./components/BottomNav";
import Header from "./components/Header/Header";
import Movies from "./Path/Movies/Movies";
import Trending from "./Path/Trending/Trending";
import Shows from "./Path/Shows/Shows";
import Search from "./Path/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/shows" component={Shows} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
