export class PixabayAPI {
    getImage() {
        const url = "https://pixabay.com/api/?key=30498969-67220c0dc8cbfcdc961351d72&q=yellow+flowers&image_type=photo";
        fetch(url).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
    }
}
    
