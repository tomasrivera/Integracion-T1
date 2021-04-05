import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppBar from './components/AppBar';
import Episodes from "./components/Episodes"
import Serie from "./components/Serie"
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Box style={{ backgroundColor: '#bfcba8', height: '100vh' }}>
        <Router>
          <AppBar/>
          <div>
            {/* <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/episodes">Episodes</Link>
              </li>
            </ul>
            <hr/> */}
            <Container>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/breakingBad">
                  <Serie name="Breaking Bad" />
                </Route>
                <Route path="/betterCallSaul">
                  <Serie name="Better Call Saul" />
                </Route>
                <Route path="/episodes">
                  <Episodes />
                </Route>
              </Switch>
            </Container>
          </div>
        </Router>
      </Box>
    )
  };
}


function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Container>
        <Link to="/breakingBad">
          <Button >
            <Avatar style={{width: '30vw', height: 'auto',}} alt="Breaking Bad" src="https://i.blogs.es/6d84c8/breaking-bad/1366_2000.jpg" />
          </Button>
        </Link>
        <Link to="/betterCallSaul">
          <Button>
            <Avatar style={{width: '30vw', height: 'auto',}} alt="Breaking Bad" src="https://storage.googleapis.com/lanacion-media-storage/2021/02/c0a7cc92-better.jpg" />
          </Button>
        </Link>
      </Container>
      
    </div>
  );
}

export default App;
