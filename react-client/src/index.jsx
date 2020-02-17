import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      user: '',
      query: '',
      pokemon: {
        name: '',
        powerLevel: 0,
        description: '',
        imageUrl: '',
      },
      pokeItems: [],
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBattle = this.handleBattle.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleUserInput(event) {
    this.setState({
      userInput: event.target.value,
    });
  }

  handleSearchInput(event) {
    this.setState({
      query: event.target.value,
    });
  }

  handleSignIn() {
    const { userInput } = this.state;
    axios.post(`/sign-in/${userInput}`)
      .then((response) => {
        console.log('=======user', response.data);
        this.setState({
          pokeItems: response.data,
          user: userInput,
        });
      })
      .then(() => {
        const { user } = this.state;
        axios.get(`/pokemvp/${user}`)
          .then((res) => {
            this.setState({
              pokeItems: res.data,
              userInput: '',
            });
          });
      })
      .catch((err) => {
        console.log('Error while signing in. See line 69 index.jsx', err);
      });
  }

  handleSearch() {
    let { query } = this.state;
    // api doen't like uppercase quries
    query = query.toLowerCase();
    // Make a request for the given pokemon
    return axios.get(`/search/?name=${query}`)
      .then((res) => {
        this.setState({
          pokemon: res.data,
          query: '',
        });
      }).catch((err) => {
        console.error('Search error. See line 86 index.jsx', err);
      });
  }

  addPokemon() {
    const { user, pokemon } = this.state;
    axios.post(`/pokemvp/${user}`, pokemon)
      .then((res) => {
        // res.data should be an array of user's pokemon
        this.setState({
          pokeItems: res.data,
        });
      })
      .catch((err) => {
        console.error('addPokemon() error. See line 101 index.jsx', err);
      });
  }

  render() {
    const {
      userInput, query, pokemon, pokeItems,
    } = this.state;

    return (
      <div>
        <h1>PokeDex</h1>
        <div id="sign-in">
          <h2>Sign In</h2>
          <input type="text" id="signin-bar" value={userInput} onChange={this.handleUserInput} />
          <button type="button" id="signin-button" onClick={this.handleSignIn}>Sign In</button>
          <p><b>{userInput}</b> is signed-in.</p>
        </div>
        <div id="search">
          <h2>Search for Pokemon</h2>
          <input type="text" id="search-bar" value={query} onChange={this.handleSearchInput} />
          <button type="button" id="search-button" onClick={this.handleSearch}>Search</button>
          <div>
            <h2>{pokemon.name.toUpperCase()}</h2>
            <img src={pokemon.imageUrl} alt="" />
            <p>{pokemon.description}</p>
            <h2>Power Level: {pokemon.powerLevel}</h2>
            <button type="button" id="button-add-list" onClick={this.addPokemon}>Add Pokemon to My Collection</button>
          </div>
        </div>
        <h2>My Pokemon</h2>
        {pokeItems.length ?
        (<List pokeItems={pokeItems} />) : (<div>You don't have any Pokemon. Search for one and add it to your collection.</div>)}
        <div id="battle">
          <h2>PokeBattle!!!</h2>
          <img src="https://66.media.tumblr.com/cfd1b3a8a2fea38a086a0bf4549b0c3d/tumblr_p27s4aXmVE1s0dt2ao1_250.gif" alt="" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
