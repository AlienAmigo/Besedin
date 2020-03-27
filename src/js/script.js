function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
  console.log('DOM ready');

  const burgerMenu = document.querySelector('#menu-burger');
  const mainNav = document.querySelector('#main-nav');
  const mainNavCloseBtn = document.querySelector('#main-nav-close-btn');

  function toggleMenu() {
    mainNav.classList.toggle('main-nav--mobile-active');
  }

  if (burgerMenu) {
    burgerMenu.addEventListener('click', ev => {
      toggleMenu();
      });
    }

    if (mainNavCloseBtn) {
      mainNavCloseBtn.addEventListener('click', ev => {
        toggleMenu();
    });
  }

  // NEWS Slider

  // $('#news-slider').slick({
  //   infinite: true,
  //   arrows: false,
  //   // dots: false,
  //   // centerMode: true,
  //   variableWidth: true,
  //   slidesToShow: 2,

  // });

});
