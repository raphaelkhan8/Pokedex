import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      query: '',
      pokemon: {
        pokename: '',
        powerLevel: 0,
        description: '',
        imageUrl: '',
      },
      items: [],
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBattle = this.handleBattle.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
  }

  componentDidMount() {
    // this.getItems()
    //   .then((data) => {
    //     this.setState({
    //       items: data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  handleUserInput(event) {
    this.setState({
      userInput: event.target.value,
    });
  }

  handleSearchInput(event) {
    console.log(event.target.value);
    this.setState({
      query: event.target.value,
    });
  }

  handleSignIn() {
    console.log('Is this the input user?');
    const { userInput } = this.state;
    axios.post(`/sign-in/${userInput}`)
      .then((response) => {
        this.setState({
          userInput: response.data,
        });
      })
      .then(() => {
        console.log('Users pokemon still needs to be gotten');
      })
      .catch((err) => {
        console.log('Error while signing in. See line 67 index.jsx', err);
      });
  }

  handleSearch() {
    console.log('searched');
  }

  addPokemon() {
    console.log('pokemon was added');
  }

  handleBattle() {
    console.log('do something');
  }

  render() {
    const {
      userInput, query, pokemon, items,
    } = this.state;

    return (
      <div>
        <h1>PokeDex</h1>
        <div id="sign-in">
          <h2>Sign In</h2>
          <input type="text" id="signin-bar" value={userInput} onChange={this.handleUserInput} />
          <button type="button" id="signin-button" onClick={this.handleSignIn}>Sign In</button>
          <p>Signed in as: {userInput}</p>
        </div>
        <div id="search">
          <h2>Search for Pokemon</h2>
          <input type="text" id="search-bar" value={query} onChange={this.handleSearchInput} />
          <button type="button" id="search-button" onClick={this.handleSearch}>Search</button>
          <button type="button" id="button-add-list" onClick={this.addPokemon}>Add Pokemon to My Collection</button>
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
