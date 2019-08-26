import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
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

  handleSignIn() {
  }

  handleSearch() {
  }

  handleBattle() {
  }

  render() {
    const { user, query, items } = this.state;

    return (
      <div>
        <h1>PokeDex</h1>
        <div id="sign-in">
          <h2>Sign In</h2>
          <input type="text" id="signin-bar" value={user} onChange={this.handleChange} />
          <button type="button" id="signin-button" onClick={this.handleSignIn}>Sign In</button>
        </div>
        <div id="search">
          <h2>Search for Pokemon</h2>
          <input type="text" id="search-bar" value={query} onChange={this.handleChange} />
          <button type="button" id="search-button" onClick={this.handleSearch}>Search</button>
        </div>
        <div id="battle">
          <h2>PokeBattle!!!</h2>
          <button type="button" id="battle-button" onClick={this.handleBattle}>Catch the searched Pokemon by battling it!</button>
        </div>
        <List items={items} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
