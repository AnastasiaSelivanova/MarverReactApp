import {useState, useCallback} from 'react';

export let useHttp = () => {
	let [loading, setLoading] = useState(false);
	let [error, setError] = useState(null);

	let request = useCallback(async(url, method = 'GET', body = null, headers = { 'Content-type' : 'application/json'})=>{
		setLoading(true);

		try{
			let response = await fetch(url, {method, body, headers});

			if(!response.ok){
				throw new Error (`Could not fetch ${url}, status: ${response.status}`);
			}

			let data = await response.json();
			setLoading(false);

			return data;
		}
		catch (e){
			setLoading(false);
			setError(e.message);
			throw e;
		}
	}, [])

	let clearError = useCallback(()=>{
		setError(null);
	},[])

	return{
		loading,
		error,
		request,
		clearError
	}
}

export default useHttp;