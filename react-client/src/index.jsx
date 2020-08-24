import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      searched: false,
      hasError: false,
      userId: '',
      username: '',
      query: '',
      pokemon: {
        name: '',
        type: '',
        powerLevel: 0,
        description: '',
        imageUrl: '',
      },
      pokeItems: [],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
    this.changeLeadPokemon = this.changeLeadPokemon.bind(this);
  }

  componentDidMount() {
    const { query } = this.state;
    if (query.length) {
      this.handleSearch();
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  handleInput(event) {
    (event.target.id === 'signin-bar')
      ? this.setState({ userInput: event.target.value })
      : this.setState({ query: event.target.value });
  }

  handleSignIn() {
    const { userInput } = this.state;
    axios.post('/sign-in', { userInput })
      .then((response) => {
        this.setState({
          userId: response.data.id,
          username: userInput,
        });
        return response;
      })
      .then((respo) => {
        const { id } = respo.data;
        axios.get(`/pokemon/${id}`)
          .then((res) => {
            this.setState({
              pokeItems: res.data,
              userInput: '',
            });
          });
      })
      .catch((err) => {
        console.error('Error while signing in.', err);
      });
  }

  handleSearch() {
    let { query } = this.state;
    query = query.toLowerCase();
    return axios.get(`/search/?name=${query}`)
      .then((res) => {
        if (!res.data) {
          this.setState({
            hasError: true,
          });
        } else {
          this.setState({
            pokemon: res.data,
            searched: true,
            query: '',
          });
        }
      }).catch((err) => {
        console.error('Search error.', err);
      });
  }

  addPokemon() {
    const { userId, pokemon, pokeItems } = this.state;
    let leadName;
    const leadPokemon = pokeItems[0] || { pokemon: { powerLevel: 1000 } };
    const pokemonName = pokemon.name[0].toUpperCase().concat(pokemon.name.slice(1));
    if (pokeItems.length) {
      leadName = leadPokemon.pokemon.name[0].toUpperCase().concat(leadPokemon.pokemon.name.slice(1));
    }
    axios.post('/pokebattle', { userId, pokemon, leadPokemon })
      .then((res) => {
        const battleMessage = res.data[0];
        const battleExperience = res.data[res.data.length - 1];
        (battleMessage === 'Caught!') ? window.alert(`Congrats! You caught ${pokemonName} \n${leadName} gained ${battleExperience} powerLevel points!`)
          : window.alert(`${leadName} fainted D: \n${pokemonName} was too strong :(`);
        this.setState({
          pokeItems: res.data.slice(1, res.data.length - 1),
          searched: false,
        });
      })
      .catch((err) => {
        console.error('Adding Pokemon error', err);
      });
  }

  changeLeadPokemon() {
    const { pokeItems } = this.state;
    const prevLead = pokeItems.shift();
    pokeItems.push(prevLead);
    this.setState({
      pokeItems,
    });
  }

  render() {
    const {
      searched, hasError, username, userInput, query, pokemon, pokeItems,
    } = this.state;

    return (hasError) ? <h2>Sorry, your query is not a Pokemon. Refresh the page to try again.</h2>
      : (
        <div>
          <h1>PokeDex</h1>
          {!username.length
            ? (
              <div id="sign-in">
                <h2>Sign In</h2>
                <input type="text" id="signin-bar" value={userInput} onChange={this.handleInput} />
                <button type="button" id="signin-button" onClick={this.handleSignIn}>Sign In</button>
              </div>
            ) : (<p><b>{username}</b> is signed-in.</p>)}
          <div id="search">
            <h2>Search for Pokemon</h2>
            <input type="text" id="search-bar" value={query} onChange={this.handleInput} />
            <button type="button" id="search-button" onClick={this.handleSearch}>Search</button>
            {searched
              ? (
                <div>
                  <h2>{pokemon.name.toUpperCase()}</h2>
                  <img src={pokemon.imageUrl} alt="" />
                  <p>{pokemon.description}</p>
                  <h2>Type: {pokemon.type.toUpperCase()}</h2>
                  <h2>Power Level: {pokemon.powerLevel}</h2>
                  <button type="button" id="button-add-list" onClick={this.addPokemon}>Battle Pokemon to Add to my Party</button>
                </div>
              )
              : (<div />)}
          </div>
          {username.length ? (<h2>{username}'s Pokemon</h2>) : <h2>My Pokemon</h2>}
          {(username.length && pokeItems.length > 1)
            ? (<div>Lead Pokemon: {pokeItems.map(poke => poke.pokemon.name)[0]}</div>
            && <button type="button" onClick={this.changeLeadPokemon}>Change Lead Pokemon</button>)
            : (<div> </div>)}
          {pokeItems.length
            ? (<List pokeItems={pokeItems} />)
            : (<div>You do not have any Pokemon. Search for one and add it to your collection.</div>)}
          <div id="battle">
            <h2>PokeTrade!!!</h2>
            <img src="https://66.media.tumblr.com/cfd1b3a8a2fea38a086a0bf4549b0c3d/tumblr_p27s4aXmVE1s0dt2ao1_250.gif" alt="" />
          </div>
        </div>
      );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
