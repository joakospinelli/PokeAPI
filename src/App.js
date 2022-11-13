import logo from './assets/pokeapi-logo.png';
import { useState } from 'react';
import Displayer from './components/Displayer';
import Spinner from 'react-bootstrap/Spinner';

function App() {

  const [ pokemons, setPokemons ] = useState(null); 

  const getInfo = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=24`;
    const api = await fetch(url);
    const info = await api.json();
    setPokemons(info);
  }

  window.addEventListener('load', getInfo);

  return (
    <div>
      <header>
        <img src={logo} className = "logo" alt="logo"/>
      </header>
      { pokemons ? (
        <div>
          <Displayer data={pokemons}></Displayer>
        </div>
      ) : (
        <Spinner animation="border" variant="danger"/>
      )}
    </div>
  );
}

export default App;
