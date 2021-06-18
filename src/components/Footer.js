import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  let logo = <img id="logo" src="../logo.png" alt="logo" />

  return (
    <div id="footer-body">
        <div id="footer-title">
          <Link to="/">CamVillage</Link>
        </div>
        <div id="footer-info">
          <span id="devking">DevKing</span>
          <span id="teammates">김정호 김현준 도하영 정상규</span>
        </div>
    </div>
  );
}

export default Footer;