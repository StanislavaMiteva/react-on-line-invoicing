import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Register from './components/common/Register/Register';
import Login from './components/common/Login/Login';

import { auth } from './utils/firebase';
import './App.css';

function App() {
  return (
    <div className="container">
      <Header />

      <main className="site-content">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" render={() => {
            auth.signOut();
            return <Redirect to="/" />;
          }} />
        </Switch>
      </main>

      <Footer />
    </div>

  );
}

export default App;
