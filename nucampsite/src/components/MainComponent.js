import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import { CAMPSITES } from "../shared/campsites";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import CampsiteInfo from "./CampsiteInfoComponent";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES
    };
  }

  render() {
    const HomePage = () => {
      return <Home />;
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/directory"
            render={() => <Directory campsites={this.state.campsites} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Directory
          campsites={this.state.campsites}
          onClick={campsiteId => this.onCampsiteSelect(campsiteId)}
        />
        <CampsiteInfo
          campsite={
            this.state.campsites.filter(
              campsite => campsite.id === this.state.selectedCampsite
            )[0]
          }
        />
        <Footer />
      </div>
    );
  }
}

export default Main;
