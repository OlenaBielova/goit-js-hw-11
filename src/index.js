import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {PixabayAPI} from './js/PixabayAPI';

const pixabay = new PixabayAPI();
console.log(pixabay);

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more-btn')
}

const onSubmit = e => {
    e.preventDefault();

    const {
elements: { searchQuery },
    } = e.currentTarget;

    const query = searchQuery.value.trim().toLowerCase();
    
    if (!query) {
        return;
    }
    console.log('get');
};


refs.searchForm.addEventListener('submit', onSubmit);