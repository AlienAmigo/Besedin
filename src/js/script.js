function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
  console.log('DOM ready');

  // константы разрешений
  const screen_xs = 480;
  const screen_sm = 768;
  const screen_md = 992;
  const screen_slg = 1280;


  // Работа с главным меню
  const burgerMenu = document.querySelector('#menu-burger');
  const mainNav = document.querySelector('#main-nav');
  const mainNavCloseBtn = document.querySelector('#main-nav-close-btn');
  const mainNavLinks = document.querySelectorAll('.main-nav__link');

  function closeMenu() {
      mainNav.classList.remove('main-nav--mobile-active');
  }

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

  mainNavLinks.forEach((item) => {
    item.addEventListener('click', ev => {
      closeMenu();
      mainNavLinks.forEach(el => el.classList.remove('main-nav__link--active'));
      ev.target.classList.add('main-nav__link--active');
    });
  });

  // Табы
  const tabLabels = document.querySelectorAll('.projects__tab-label');
  const tabPanels = document.querySelectorAll('.projects__tab-wrap');
  const activeTabClass = 'projects__tab-wrap--active';

  function closeTab(tab, cl) {
    tab.classList.remove(cl);
  }

  function showTab(tab, cl) {
    tab.classList.add(cl);
  }

  tabLabels.forEach(item => {
    item.addEventListener('click', ev => {
      let tabId = 'tab-' + item.id.match(/(?<=label-)(.+)/gim);
      let selectedTab = document.querySelector('#'+tabId);
      if (!selectedTab.classList.contains(activeTabClass)) {
        tabPanels.forEach(item => closeTab(item, activeTabClass));
        showTab(selectedTab, activeTabClass);
        tabLabels.forEach(item => {
          item.classList.remove('projects__tab-label--active');
        });
        item.classList.add('projects__tab-label--active');
      }
    });
  });

  // Панели (содержимое табов)

  const panelTrigger = document.querySelectorAll('.projects__item');
  const contentPanel = document.querySelectorAll('.projects__tab-content');
  const activePanelClass = 'projects__tab-content--active';
  const activeTrigClass = 'projects__item--active'
  const collapseBtn = document.querySelectorAll('.button-collapse');

  panelTrigger.forEach(item => {
    item.addEventListener('click', ev => {
      let panelId = 'content-' + item.id;
      let selectedPanel = document.querySelector('#' + panelId);
      let selectedTrigger = ev.target;

      contentPanel.forEach(item => {
        closeTab(item, activePanelClass);
      });
      panelTrigger.forEach(item => {
        showTab(item, activeTrigClass);
      });
      closeTab(selectedTrigger, activeTrigClass);
      showTab(selectedPanel, activePanelClass);
      selectedPanel.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  collapseBtn.forEach(item => {
    item.addEventListener('click', () => {
      let anchor = document.querySelector('#Projects')
      panelTrigger.forEach(el => showTab(el, activeTrigClass));
      contentPanel.forEach(el => closeTab(el, activePanelClass));
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Плавная прокрутка

  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let item of anchors) {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      const blockID = item.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  // NEWS Slider

  // $('#news-slider').slick({
  //   infinite: true,
  //   arrows: false,
  //   dots: false,
  //   centerMode: true,
  //   focusOnSelect: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   centerPadding: '20px',
  //   variableWidth: true,
  //   // responsive: [
  //   //   {
  //   //     breakpoint: 768,
  //   //     slidesToShow: 2,
  //   //   },
  //   //   {
  //   //     breakpoint: 480,
  //   //     slidesToShow: 1,
  //   //   },
  //   // ],
  // });

  // let glide = new Glide('#news-slider', {
  //   type: 'carousel',
  //   focusAt: 'center',
  //   perView: 3,
  //   peek: {
  //     before: 50,
  //     after: 50
  //   },
  //   breakpoints: {
  //     1280: {
  //       perView: 2,
  //       peek: {
  //         before: 50,
  //         after: 50
  //       },
  //     },
  //     768: {
  //       perView: 2,
  //       peek: {
  //         before: 25,
  //         after: 25
  //       },
  //     }
  //   }
  // })

  // glide.mount()

    $(".owl-carousel").owlCarousel({
      center:true,
      loop: true,
      stagePadding: 50,
      responsive:{
        0:{
          items: 1,
          stagePadding: 25,
          center:true,
          loop: true,
        },
        480:{
          items: 2,
          stagePadding: 15,
          center:true,
          loop: true,
        },
        768:{
            items: 2
        },
        992:{
            items: 3
        }
    }
    });

  // ============
});
