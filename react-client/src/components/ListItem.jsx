import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ pokeItem }) => (
  <table>
    <tbody>
      <tr>
        <td>
          <img src={pokeItem.pokemon.imageUrl} alt="pokeImg" />
        </td>
        <td>
          <strong>{pokeItem.pokemon.name.toUpperCase()}</strong>
        </td>
        <td>
          <em>{pokeItem.pokemon.description}</em>
        </td>
        <td>
          Power Level: {pokeItem.pokemon.powerLevel}
        </td>
      </tr>
    </tbody>
  </table>
);

ListItem.propTypes = {
  pokeItem: PropTypes.shape({
    powerLevel: PropTypes.number,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default ListItem;
