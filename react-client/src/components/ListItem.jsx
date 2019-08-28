// import React from 'react';
// import PropTypes from 'prop-types';

// const ListItem = ({ pokeItem }) => (
//   <div>
//     <img src={pokeItem.imageUrl} alt="fail" />
//   </div>
// );

// ListItem.propTypes = {
//   pokeItem: PropTypes.objectOf(PropTypes.shape({
//     imageUrl: PropTypes.string,
//   })).isRequired,
// };

// export default ListItem;

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
          <strong>{pokeItem.name}</strong>
        </td>
        <td>
          <em>{pokeItem.description}</em>
        </td>
        <td>
          Base EXP: {pokeItem.baseEXP}
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
