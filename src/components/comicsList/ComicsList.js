import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const ComicsList = (props) => {
    let {getAllComics, loading, error, clearError} = useMarvelService();

    let [charList, setCharList] = useState([]);
    let [newItemLoading, setNewItemLoading] = useState(false);
    let [charEnded, setCharEnded] = useState(false);
    let [offset,setOffset] = useState(0);

    useEffect(()=>{
        onRequest(offset, true);
    },[])

    let onRequest = (offset, instal) => {
        instal ? setNewItemLoading(false) : setNewItemLoading(true);
        console.log(offset)
        getAllComics(offset).then(onCharListLoaded);
    }

    let onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 8) {
            ended = true;
        }

        setCharEnded(ended);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setCharList(charList => [...charList, ...newCharList]);
    }

    function renderItems(arr){
        let items = arr.map((item,i) => {
            if(item.price == 0) item.pprice = 'NOT AVAILABLE';

            return(
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    let items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display' : charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;