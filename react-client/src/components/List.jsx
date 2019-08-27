import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import ListItem from './ListItem.jsx';

// import uuid to generate random key for each pokeItem
const id = uuid.v4();

const List = ({ pokeItems }) => (
  <div>
    <h4> My Pokemon Collection </h4>
    There are { pokeItems.length } pokemon in your pokedex.
    { pokeItems.map(pokeItem => <ListItem pokeItem={pokeItem} key={id} />)}
  </div>
);

List.propTypes = {
  pokeItems: PropTypes.arrayOf(PropTypes.shape({
    pokeName: PropTypes.string,
    powerLevel: PropTypes.number,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  })).isRequired,
};

export default List;
