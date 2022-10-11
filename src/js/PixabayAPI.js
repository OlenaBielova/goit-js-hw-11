export class PixabayAPI {
    getImage(query) {
        const url = `https://pixabay.com/api/?key=30498969-67220c0dc8cbfcdc961351d72&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
        return fetch(url).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
    }
}
    
