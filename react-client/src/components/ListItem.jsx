import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ pokeItem }) => (
  <div>
    <img src={pokeItem.imageUrl} alt="fail" />
  </div>
);

ListItem.propTypes = {
  pokeItem: PropTypes.objectOf(PropTypes.shape({
    imageUrl: PropTypes.string,
  })).isRequired,
};

export default ListItem;
