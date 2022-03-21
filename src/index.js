import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';

// import MarvelService from '../src/services/MarvekService';

// let marvelService = new MarvelService();
// marvelService.getAllCharacters().then(res => console.log(res));
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));
// marvelService.getCharacter(1011052).then(res => console.log(res.name));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

