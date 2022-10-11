import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {PixabayAPI} from './js/PixabayAPI';

const pixabay = new PixabayAPI();

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
    console.log(query);
    if (!query) {
        return;
    }
    pixabay.getImage(query).then(({hits}) => {
        console.log(hits);
        const markup = createMarkup(hits);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
    });
};

refs.searchForm.addEventListener('submit', onSubmit);

function createMarkup(hits) {
    return hits.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        
        return `<div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b><br>${likes}
            </p>
            <p class="info-item">
              <b>Views</b><br>${views}
            </p>
            <p class="info-item">
              <b>Comments</b><br>${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b><br>${downloads}
            </p>
          </div>
        </div>`;
    }).join('');
}