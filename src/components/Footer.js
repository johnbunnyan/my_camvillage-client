import React from 'react';

function Footer() {
  let logo = <img id="logo" src="../logo.png" alt="logo" />

  return (
    <div id="footer-body">
      {logo}
      <div id="footer-info">DevKings 김정호 김현준 도하영 정상규</div>
    </div>
  );
}

export default Footer;