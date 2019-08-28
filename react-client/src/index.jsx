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
        pokename: '',
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
          user: response.data,
        });
      })
      .then(() => {
        const { user } = this.state;
        axios.get(`/pokemvp/${user}`)
          .then((res) => {
            // res.data should be an array of user's pokemon
            this.setState({
              pokeItems: res.data,
              userInput: '',
            });
          });
      })
      .catch((err) => {
        console.log('Error while signing in. See line 75 index.jsx', err);
      });
  }

  handleSearch() {
    console.log('searched');
    const { query } = this.state;
    // Make a request for the given pokemon
    return axios.get(`/search/?name=${query}`)
      .then((res) => {
        this.setState({
          pokemon: res.data,
          query: '',
        });
      }).catch((err) => {
        console.error('Search error. See line 82 index.jsx', err);
      });
  }

  addPokemon() {
    const { user, pokemon } = this.state;
    console.log('USER@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', user);
    axios.post(`/pokemvp/${user}`, pokemon)
      .then(() => axios.get(`/pokemvp/${user}`))
      .then((res) => {
        // res.data should be an array of user's pokemon
        this.setState({
          pokeItems: res.data,
        });
      })
      .catch((err) => {
        console.error('addPokemon() error. See line 108 index.jsx', err);
      });
  }

  handleBattle() {
    console.log('do something');
  }

  render() {
    const {
      user, userInput, query, pokemon, pokeItems,
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
            {console.log('pokemon searched:', pokemon)}
            <h2>{pokemon.name}</h2>
            <img src={pokemon.imageUrl} alt="" />
            <p>{pokemon.description}</p>
            <p>Power Level: {pokemon.powerLevel}</p>
            <button type="button" id="button-add-list" onClick={this.addPokemon}>Add Pokemon to My Collection</button>
          </div>
        </div>
        <div id="battle">
          <h2>PokeBattle!!!</h2>
          <button type="button" id="battle-button" onClick={this.handleBattle}>Catch the searched Pokemon by battling it!</button>
        </div>
        <h2>My Pokemon</h2>
        <List pokeItems={pokeItems} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
