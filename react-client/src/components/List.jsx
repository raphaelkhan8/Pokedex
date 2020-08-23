import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import ListItem from './ListItem.jsx';

const List = ({ pokeItems }) => (
  <div>
    {
      pokeItems.map((pokeItem) => {
        // import uuid to generate random key for each pokeItem
        const { pokemon } = pokeItem;
        const id = uuid.v4();
        return (<ListItem pokeItem={pokemon} key={id} />);
      })
    }
  </div>
);

List.propTypes = {
  pokeItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    powerLevel: PropTypes.number,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  })).isRequired,
};

export default List;
