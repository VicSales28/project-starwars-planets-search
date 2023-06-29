import React, { Component } from 'react';

import '../styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div>
          <p>
            <strong>Projeto StarWars Planets Search</strong>
            {' '}
            por
            {' '}
            <a className="link_footer" href="https://github.com/VicSales28">Victoria Sales</a>
            . Projeto desenvolvido enquanto estudava Context API e Hooks na
            {' '}
            <a className="link_footer" href="https://www.betrybe.com/">Escola de Programação Trybe</a>
            .
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
