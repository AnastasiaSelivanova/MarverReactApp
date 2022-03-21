import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';



function CharInfo (props) {
    let [char, setChar] = useState(null);

     let {loading, error, getCharacter, clearError} = useMarvelService();    

    useEffect(()=>{
        updateChar();
    },[props.charId])

    let onCharLoaded = (char) => {
        setChar(char);
    }

    let updateChar = () => {
        clearError();
        let {charId} = props;
        if(!charId){
            return;
        }
        
        getCharacter(charId)
            .then(onCharLoaded)
    }

    let skeleton = char || loading || error ? null : <Skeleton/>;
    let errorMassege = error ? <ErrorMessage/> : null;
    let spinner = loading ? <Spinner/> : null;
    let content = !(loading || error || !char) ? <View char={char}/> : null; 

    return (
        <div className="char__info">
           {skeleton}
           {errorMassege}
           {spinner}
           {content}
        </div>
    )
}



let View = ({char}) => {
    let {name, description, thumbnail, homepage, wiki, comics} = char;
    let styleImg = {objectFit:'cover'};

    if(description.length === 0) description = 'There is no description for this character.';
    if(description.length > 200) description = description.slice(0,200) + '...';
    if(comics.length === 0) comics[0] = { resourceURL: '#', name: 'There is no comics for this character.'}; 
    if(comics.length > 5) {  // ЛУЧШЕ ИСПОЛЬЗОВАТЬ ЦИКЛ FOR В СОЗДАНИИ КОМПОНЕНТОВ ПРИ БОЛЬШОМ КОЛ-ВЕ ДАННЫХ
        comics = comics.slice(0, 10);   
        comics[10] =  { resourceURL: '#', name: '...'}; 
    } 
    if(thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg')
    styleImg = {objectFit:'contain'};

    let comicsIdArr = []
    for(let i = 0; i < comics.length-1; i++) {
        comicsIdArr[i] = comics[i].resourceURI.replace(/http:\/\/gateway.marvel.com\/v1\/public\/comics\//g, '')
    }

    return(
        <>
            <div className="char__basics">
                        <img src={thumbnail} alt="abyss" style={styleImg}/>
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">
                        {description}
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {
                            comics.map((item,i)=>{  // ТУТ ЛУЧШЕ ЦИКЛ FOR
                                return(
                                    <li key={i} className="char__comics-item">
                                        <Link to={`/comics/${comicsIdArr[i]}`}>
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;