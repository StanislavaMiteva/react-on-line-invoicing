import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Register from './components/common/Register/Register';
import Login from './components/common/Login/Login';
import Counterparties from './components/Counterparties/Counterparties';

import { auth } from './utils/firebase';
import './App.css';

function App() {
  return (
    <Container fluid>
      <div className="site-wrapper">
        <Header />

        <main className="site-content">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" render={() => {
              auth.signOut()
                .then(() => {
                  console.log("Successfully sign-out")
                })
                .catch((error) => {
                  console.log(error.message, 'Error - sign-out user');
                })
              return <Redirect to="/" />;
            }} />
            <Route path="/counterparties" component={Counterparties} />
          </Switch>
        </main>

        <Footer />
      </div>


    </Container>

  );
}

export default App;
