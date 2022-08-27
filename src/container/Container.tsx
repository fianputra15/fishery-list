import React, { Suspense } from 'react';
import Home from '../pages/Home';
import { Route, Switch, Link } from 'react-router-dom';

const Container: React.FC = () => {
  return (
    <>
      <header>
        <div className="navbar">
          <Link className="title" to="/">
            Fishery List
          </Link>
        </div>
      </header>
      <main>
        {' '}
        <Switch>
          <Suspense>
            <Route exact path="/" render={() => <Home />}></Route>
          </Suspense>
        </Switch>
      </main>
      <footer>
        <div>
          <p>Fishery List. &copy;2022</p>
        </div>
      </footer>
    </>
  );
};

export default Container;
