import React from 'react';
import { Link } from 'react-router-dom';

interface ContainerType {
  children: React.ReactNode;
}

const Container: React.FC<ContainerType> = (props) => {
  const { children } = props;
  return (
    <>
      <header>
        <div className="navbar">
          <Link className="title" to="/">
            Fishery List
          </Link>
          <Link className="menu" to="/collection">
            Add
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div>
          <p>Fishery List. &copy;2022</p>
        </div>
      </footer>
    </>
  );
};

export default Container;
