import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem.jsx';

const List = ({ pokemon }) => (
  <div>
    <h4> List Component </h4>
    There are { pokemon.length } items.
    { pokemon.map(pokeItem => <ListItem pokeItem={pokeItem} />)}
  </div>
);

List.propTypes = {
  pokemon: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
};

export default List;
