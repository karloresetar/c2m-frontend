import React from "react";
import { Link } from 'react-router-dom'

const Person = ({ person }) => {
  return (
    <div className="person__item">
      <Link to={`/persons/${person.id}`} className="person__header">
        <div className="person__image">
          <img src={person.photoUrl} alt={person.name} />
        </div>
        <div className="person__details">
          <p className="person_name">{person.name.substring(0, 15)}</p>
          <p className="person_country">CountryAddLater</p>
          <p className="person_title">{person.title}</p>
        </div>
      </Link>
      <div className="person__body">
        <p><i className="bi bi-info-circle"></i> {person.description}</p>
        <a href={person.channelLink} target="_blank" rel="noopener noreferrer" className="channel_link">
          <p><i className="bi bi-youtube"></i> {person.channelLink}</p>
        </a>
      </div>
    </div>
  );
};

export default Person;
