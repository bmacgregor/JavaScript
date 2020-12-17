'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Variables

const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header');
const message = document.createElement('div');
const logo = document.querySelector('.nav__logo');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const h1 = document.querySelector('h1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const initialCoords = section1.getBoundingClientRect();

// sticky navigation variables
const navHeight = nav.getBoundingClientRect().height; // dynamically get the height of the nav bar
const stickyNav = function (entries) {
  const [entry] = entries;
  entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
// Intersection Observers

// revealing sections on scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // only proceed if intersection is true - guard clause

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // dropping the target from observation
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]'); // select images with a data-src property in CSS
const loadImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // listening for the image load event before removing the blur
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // images load before the threshold is reached
});
imgTargets.forEach(img => imgObserver.observe(img));

// slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    activateDot(slide);
  };

  const initSlider = function () {
    createDots();
    goToSlide(0);
  };

  initSlider();

  const nextSlide = function () {
    curSlide === slides.length - 1 ? (curSlide = 0) : curSlide++;

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    curSlide === 0 ? (curSlide = slides.length - 1) : curSlide--;

    goToSlide(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
    }
  });
};
slider();

///////////////////////////////////////
// HTML Elements

message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

///////////////////////////////////////
// CSS Styles

message.style.backgroundColor = '#37383d';
message.style.width = '105%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';

///////////////////////////////////////
// Event Listeners

// closing the cookie message
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// smooth scrolling to section 1 from 'Learn More'
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// button scrolling and page navigation using EVENT DELEGATION - no need for forEach
// 1. Add event listener to common parent element (nav_LinkS is the parent for nav_link)
// 2. Figure out which child element created the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // matching strategy - only work on the link, not the LINKS parent
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabs component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return; // guarding against clicks on the operations tab instead of a button inheriting the listener

  // activate the tab
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // remove active from all tabs
  clicked.classList.add('operations__tab--active'); // add active to the clicked tab

  // activate the content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// function for menu fading
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
  logo.style.opacity = this;
};

// menu fade on mouseOver
nav.addEventListener('mouseover', handleHover.bind(0.5));

// menu fade-in on mouseOut
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// LECTURES
///////////////////////////////////////

// --------------------------------- //
// 198 - EFFICIENT SCRIPT LOADING - DEFER AND ASYNC
// --------------------------------- //

const lesson198 = function () {};
lesson198();

// --------------------------------- //
// 197 - LIFECYCLE DOM EVENTS
// --------------------------------- //

const lesson197 = function () {
  document.addEventListener('DOMContentLoaded', function (e) {
    console.log('HTLM Parsed and DOM tree built.');
    console.log(e);
  });

  window.addEventListener('load', function (e) {
    console.log('Page fully loaded.');
    console.log(e);
  });

  /* window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    console.log(e);
    e.returnValue = '';
  }); */
};
lesson197();

// --------------------------------- //
// 196 - BUILDING A SLIDER P2
// --------------------------------- //

// keyboard event attached on arrow keys
// created dots and activeDot
// put everything into a function to remove variables from global

// --------------------------------- //
// 195 - BUILDING A SLIDER P1
// --------------------------------- //

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.3) translateX(-1200px)';
// slider.style.overflow = 'visible';

// --------------------------------- //
// 194 - LAZY LOADING IMAGE
// --------------------------------- //

// we need to optimize how images are loaded on a page, so we use lazy loading
// this works by swapping a blurred, low res image with an unblurred, high res image with the observer API

// --------------------------------- //
// 193 - REVEALING ELEMENTS ON SCROLL
// --------------------------------- //

// also leverages intersection observer

// --------------------------------- //
// 192 - A BETTER WAY: INTERSECTION OBSERVER API
// --------------------------------- //

// use intersection observer API instead of scroll events!
/* const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};
const observer = new IntersectionObserver(obsCallback, obsOptions); 
observer.observe(section1);*/

// --------------------------------- //
// 191 - IMPLEMENTING STICKY NAVIGATION: THE SCROLL EVENT
// --------------------------------- //

// scroll events are inefficient, and should be avoided!
/* window.addEventListener('scroll', function (e) {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}); */

// --------------------------------- //
// 190 - PASSING ARGUMENTS TO EVENT HANDLERS
// --------------------------------- //

// used bind to pass e, opacity on the links is handled by *this*

// --------------------------------- //
// 189 - BUILDING A TABBED COMPONENT
// --------------------------------- //

// created tabbed component event listener

// --------------------------------- //
// 188 - DOM TRAVERSING
// --------------------------------- //

// going down from h1, selecting child elements
// console.log(h1.querySelectorAll('.highlight')); // gets all elements specified by the query
// console.log(h1.childNodes); // gets all children
// h1.firstElementChild.style.color = 'grey';
h1.lastElementChild.style.color = 'white';

// going upwards, to the parents
// console.log(document.querySelector('.nav__link')); // grabs the element
// console.log(document.querySelector('.nav__link').parentNode); // grabs the direct parent
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// going sideways, to DIRECT siblings
// console.log(h1.previousElementSibling); // no previous element node
// console.log(h1.nextElementSibling); // next element node is the h4 block in the header
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// getting all the siblings by moving up to the parent and then reading the children
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {if (el !== h1) el.style.transform = 'scale(0.5)';});

// --------------------------------- //
// 187 - EVENT DELEGATION: PAGE NAVIGATION
// --------------------------------- //

// smooth scrolling in navigation

// --------------------------------- //
// 186 - EVENT PROPAGATION IN PRACTICE
// --------------------------------- //

// making a random colour
// console.log('rgb(255,255,255)');
const randomIntL186 = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);
const randomColourL186 = () =>
  `rgb(${randomIntL186(0, 255)},${randomIntL186(0, 255)},${randomIntL186(
    0,
    255
  )})`;
// console.log(randomColourL186());

/* document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColourL186();
  console.log('Link. TARGET: ', e.target), 'CURRENT TARGET: ', e.currentTarget;

  // stopping propegation
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColourL186();
  console.log(
    'NavLinks. TARGET: ',
    e.target,
    'CURRENT TARGET: ',
    e.currentTarget
  );
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColourL186();
    console.log('Nav. TARGET: ', e.target, 'CURRENT TARGET: ', e.currentTarget);
  },
  true // setting the capture flag set to true, by default it is false and waits for bubbling
); */

// --------------------------------- //
// 185 - EVENT PROPAGATION: BUBBLING AND CAPTURING
// --------------------------------- //

// lecture on bubbling and capturing
// - events bubble up from the target to the root
// -- events pass through parents, but not siblings
// -- as the event bubbles up through the parent, the event occurs in the parent as well

// --------------------------------- //
// 184 - TYPES OF EVENTS AND HANDLERS
// --------------------------------- //

// const alertH1 = function () {alert('Great! You are reading the heading XD');

// removes the event once it's been handled
// h1.removeEventListener('mouseenter', alertH1);};

// events that fire on mouseover of h1
// h1.addEventListener('mouseenter', alertH1);

// alternatively, removing the handler after 10 milliseconds
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 10);

// --------------------------------- //
// 183 - SMOOTH SCROLLING
// --------------------------------- //

// see smooth scrolling event

/* btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll position (X/Y)', window.pageXOffset, window.pageYOffset);
  // console.log('Viewport height/width: ', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // scrolling to the element, adding the top of the section coord to the scrolled coord to get the absolute position of the section, using a nice animation (smooth scrolling)
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // simpler, modern version of smooth scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
}); */

// --------------------------------- //
// 182 - STYLES, ATTRIBUTES, AND CLASSES
// --------------------------------- //

// CSS Styles - see CSS style block

// console.log(message.style.height);
// console.log(message.style.color);
// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// console.log(logo.className);
// console.log(logo.alt);
logo.alt = 'Beautiful minimalist logo';
// console.log(logo.alt);

// console.log(logo.designer); // non-standard attribute, can't read it like this
// console.log(logo.getAttribute('designer')); // have to do this

// programatically creating an attribute
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src); // absolute url
// console.log(logo.getAttribute('src')); // relative url

const linkL182 = document.querySelector('.nav__link--btn');
// console.log(linkL182.href); // absolute url
// console.log(linkL182.getAttribute('href')); // relative url

// console.log(logo.dataset.versionNumber); // data attributes are stored in the dataset objects

// classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// --------------------------------- //
// 181 - SELECTING, CREATING, AND DELETING ELEMENTS
// --------------------------------- //

// selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// header.append(message.cloneNode(true));
// header.prepend(message);
// header.before(message);
// header.after(message);

// --------------------------------- //
// 180 - HOW THE DOM REALLY WORKS
// --------------------------------- //

// lecture about the DOM
// - DOM is an interface that lives between JS and the browser
// - We can create, modify, delete elements, listen and respond to events, set styles, classes, and attributes
// - DOM is just an API; it's an interface we use to interact with the DOM
// - it contains methods (querySelector, textContent, addEventListener, etc)
// - everything in the DOM is a Node, with children of Element, Text, Comment, and Document types

// --------------------------------- //
// 179 - Bankist Website
// --------------------------------- //
// fixed modal default behaviour, swapped the forLoop on the open Modal to a foreach that adds an event listener to all btnsOpenModal buttons (top of page and bottom)
