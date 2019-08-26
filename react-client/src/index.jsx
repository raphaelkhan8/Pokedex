import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      items: [],
    };
    this.getItems = this.getItems.bind(this);
    this.handleChange = this.handleChange(this);
    this.handleSearch = this.handleSearch(this);
  }

  componentDidMount() {
    this.getItems()
      .then((data) => {
        this.setState({
          items: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getItems() {
    return axios.get('/items')
      .then(response => response.data);
  }

  handleChange(event) {
    this.setState({
      query: event.target,
    });
  }

  handleSearch() {
  }

  render() {
    const { query, items } = this.state;

    return (
      <div>
        <h1>PokeDex</h1>
        <div id="search">
          <h1>Search for Pokemon</h1>
          <input type="text" id="search-bar" value={query} onChange={this.handleChange} />
          <button type="button" id="search-button" onClick={this.handleSearch}>Search</button>
        </div>
        <List items={items} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
