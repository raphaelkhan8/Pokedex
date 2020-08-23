import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ pokeItem }) => (
  <table>
    <tbody>
      <tr>
        <td>
          <img src={pokeItem.imageUrl} alt="pokeImg" />
        </td>
        <td>
          <strong>{pokeItem.name.toUpperCase()}</strong>
        </td>
        <td>
          <em>{pokeItem.description}</em>
        </td>
        <td>
          Type: {pokeItem.type.toUpperCase()}
        </td>
        <td>
          Power Level: {pokeItem.powerLevel}
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
    type: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default ListItem;
