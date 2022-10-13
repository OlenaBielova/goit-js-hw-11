import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { PixabayAPI } from './js/PixabayAPI';
import { createMarkup } from './js/createMarkup';
import { refs } from './js/refs';

const pixabay = new PixabayAPI();
let lightbox = new SimpleLightbox('.gallery a', {captionsData:'alt', captionPosition:'bottom', animationSpeed:250});

const onSubmit = e => {
    e.preventDefault();

    const {
        elements: { searchQuery },
    } = e.currentTarget;

    const currentQuery = searchQuery.value.trim().toLowerCase();
    console.log(currentQuery);
    if (!currentQuery) {
        return;
    }
    pixabay.query = currentQuery;
    pixabay.reserPage();
    refs.gallery.innerHTML = '';
    
    pixabay.getImage().then(({ hits, totalHits }) => {
        console.log(hits.length);
        
        if (hits.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        } else {
            Notify.success(`Hooray! We found ${totalHits} images.`);
        }
        
        const markup = createMarkup(hits);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();

        pixabay.calculateTotalPages(totalHits);
        console.log(pixabay);
        if (pixabay.isLoadMoreBtnShown) {
            refs.loadMoreBtn.classList.remove('is-hidden');
        }
    })
        .catch(error => {
            console.log(error);
        })
};

const onLoadMore = () => {
    pixabay.incrementPage();
    console.log(pixabay);

    pixabay.getImage().then(({ hits, totalHits }) => {
        const markup = createMarkup(hits);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();
    })
    if (!pixabay.isLoadMoreBtnShown) {
            refs.loadMoreBtn.classList.add('is-hidden');
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
    
}

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


// document.addEventListener('scroll', (event) => {
//     const { height: cardHeight } = document
//     .querySelector(".gallery")
//     .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//     top: cardHeight * 2,
//     behavior: "smooth",
// });
// });

