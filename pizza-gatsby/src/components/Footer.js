import React from 'react';

const Footer = () => {
  const currentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <footer>
      <p className="center">&copy; Slick's Slices {currentYear()}</p>
    </footer>
  );
};

export default Footer;
