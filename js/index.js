import Swiper from '../libs/Swiper/swiper-bundle.esm.browser.min.js';


// simplebar
new SimpleBar(document.querySelector('.country__list'), {
  classNames: {
    scrollbar: 'country__scrollbar',
    track: 'country__track',
  }
});


// slider
const swiper = new Swiper('.goods__block', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
  navigation: {
    prevEl: '.goods__arrow_prev',
    nextEl: '.goods__arrow_next',
  },
  preventClicks: true,
  a11y: false,
});


//modal
const productMore = document.querySelectorAll('.product__more');
const modal = document.querySelector('.modal');
const formPlaceholder = document.querySelectorAll('.form__placeholder');
const formInput = document.querySelectorAll('.form__input');

productMore.forEach((item) => {
  item.addEventListener('click', () => {
    modal.classList.add('modal_open');
  })
});

modal.addEventListener('click', ({ target }) => {
  if (target === modal) {
    modal.classList.remove('modal_open');
  }
});

formInput.forEach((item, i) => {
  item.addEventListener('focus', () => {
    formPlaceholder[i].classList.add('form__placeholder_active');
  })

  item.addEventListener('blur', () => {
    if (item.value === '') {
      formPlaceholder[i].classList.remove('form__placeholder_active');
    }
  })
});


// currency
const dataCurrency = {};

const formatCurrensy = (value, currency) => {
  return new Intl.NumberFormat('EU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

const showPrice = (currency = 'USD') => {
  const priceElems = document.querySelectorAll('[data-price]');

  priceElems.forEach(item => {
    item.textContent = formatCurrensy(item.dataset.price * dataCurrency[currency], currency);
  })
};


// =========================================================

const myHeaders = new Headers();
myHeaders.append("apikey", "zC62Mdlnm1i6j5vaB4T2K6tCdlav7V6D");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?&base=USD", requestOptions)
  .then(response => response.json())
  .then(result => {
    Object.assign(dataCurrency, result.rates);
    showPrice();
  })
  .catch(error => console.log('error', error));

// =========================================================


// choises
const countryBtn = document.querySelector('.country__btn');
const countryWrapper = document.querySelector('.country__wrapper');

countryBtn.addEventListener('click', () => {
  countryWrapper.classList.toggle('country__wrapper_open');
});

countryWrapper.addEventListener('click', ({ target }) => {
  if (target.classList.contains('country__choise')) {
    countryWrapper.classList.remove('country__wrapper_open');
    showPrice(target.dataset.currency);
  }
});
