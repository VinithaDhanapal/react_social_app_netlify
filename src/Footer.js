import React from "react";

const Footer = () => {
  const today = new Date();
  return (
    <footer className="Footer">
      <p>Coppyright &copy; {today.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
