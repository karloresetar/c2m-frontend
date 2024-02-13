import React from "react";

const Header = ({ toggleModal, nbOfPersons }) => {
  return (
    <header className="header">
      <div className="container">
        <h3>Person List ({nbOfPersons})</h3>
        <button onClick={() => toggleModal(true)} className="btn">
          <i className="bi bi-plus-square"></i> Add New Person
        </button>
      </div>
    </header>
  );
};

export default Header;
