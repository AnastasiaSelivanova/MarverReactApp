import {useHttp} from '../hooks/http.hook';

let useMarvelService = () => {

	let {loading,error,request,clearError} = useHttp();

	let _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	let _apiKey = 'apikey=b41f76f7ecf7b56a11995b3a9a1f09fd';
	let _baseOffset = 210;
	let _baseLimit = 9;

	let getAllComics = async(offset) => {
		console.log(offset);
		let res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics) ;
	}

	let getComic = async(id) => {
		let res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	}

	let _transformComics = (comics) => {
		console.log(comics.id);
		return{
			id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
		}
	}

	let getAllCharacters = async (offset = _baseOffset) => {
        let res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    let getCharacter = async (id) => {
        let res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

	let _transformCharacter = (char) => {
		
		if(char.description.length == 0) char.description = 'There is no description for this character.';
		if(char.description.length > 200) char.description = char.description.slice(0,200) + '...';

		return{
			name: char.name,
			description: char.description,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items,
		}
	}

	return {
		loading,
		error,
		getAllCharacters,
		getCharacter,
		clearError,
		getAllComics,
		getComic,
	}
}

export default useMarvelService;