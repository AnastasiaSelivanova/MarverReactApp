import { useParams, Link} from 'react-router-dom';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
  	let {comicId} = useParams();  // получаем ключ + значение
	let [comic,setComic] = useState(null);

	let {loading, error, getComic, clearError} = useMarvelService();    

	useEffect(()=>{
        updateComic();
    },[comicId])

    let updateComic = () => {
        clearError();

        getComic(comicId)
            .then(onComicLoaded)
    }

    let onComicLoaded = (comic) => {
        setComic(comic);
    }


    let errorMassege = error ? <ErrorMessage/> : null;
    let spinner = loading ? <Spinner/> : null;
    let content = !(loading || error || !comic) ? <View comic={comic}/> : null; 

    return (
       <>
		{errorMassege}
		{spinner}
		{content}
	   </>
    )
}

let View = ({comic}) => {
	let {title, description, pageCount,price, language, thumbnail} = comic;

	return(
		<div className="single-comic">
			<img src={thumbnail} alt="x-men" className="single-comic__img"/>
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">{language}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to="/comics" className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleComicPage;