function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}


ready(function(){

  console.log('DOM ready');

  hidePreloader();

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

  function showAllTabs(arr, cl) {
    arr.forEach(item => {
      showTab(item, cl);
    });
  }

  function closeAllTabs(arr, cl) {
    arr.forEach(item => {
      closeTab(item, cl);
    });
  }

  tabLabels.forEach(item => {
    item.addEventListener('click', ev => {
      let tabId = 'tab-' + item.id.match(/(?<=label-)(.+)/gim);
      let selectedTab = document.querySelector('#'+tabId);
      if (!selectedTab.classList.contains(activeTabClass)) {
        tabPanels.forEach(item => {
          closeTab(item, activeTabClass)
        });
        // contentPanel.forEach(item => {
        //   closeTab(item, activePanelClass);
        // });
        // panelTrigger.forEach(item => {
        //   showTab(item, activeTrigClass);
        // });
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
      const targetElem = document.getElementById(blockID);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      let targetCoordinates = targetElem.getBoundingClientRect().top;


      window.scrollBy({
        top: targetCoordinates - 90,
        left: 0,
        behavior: 'smooth'
      });
    });
  }

  // Кнопка «Наверх»
  function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('upbtn--show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('upbtn--show');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80, 'smooth');
      setTimeout(backToTop, 0);
    }
  }

  const goTopBtn = document.querySelector('#upbtn');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);


  // Карусель Новостей
    let newsGallery = new Glide('#news-slider', {
      type: 'carousel',
      startAt: 0,
      perView: 3,
      gap: 16,
      breakpoints: {
        1280: {
          perView: 3,
          gap: 19,
          peek: 0
        },
        992: {
          perView: 2,
          gap: 20,
          peek: 111
        },
        768: {
          perView: 1,
          gap: 20,
          peek: 78
        },
        480: {
          perView: 1
        }
      }
    });

    newsGallery.mount();


  // РАБОТА С ВИДЕО

  function load() {
    console.log('Content loaded');

    // PLAY/PAUSE ВСТРОЕННЫХ ВИДЕО =============================
    const myVids = document.querySelectorAll('.video');
    window.addEventListener('scroll', () =>  {
      myVids.forEach(vid => {
        let targetPosition = {
          top: window.pageYOffset + vid.getBoundingClientRect().top,
          left: window.pageXOffset + vid.getBoundingClientRect().left,
          right: window.pageXOffset + vid.getBoundingClientRect().right,
          bottom: window.pageYOffset + vid.getBoundingClientRect().bottom
        },
        // Получаем позиции окна
        windowPosition = {
          top: window.pageYOffset,
          left: window.pageXOffset,
          right: window.pageXOffset + document.documentElement.clientWidth,
          bottom: window.pageYOffset + document.documentElement.clientHeight
        };

        // обходим ошибку в Google Chrome

        // Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause().
        // or
        // Uncaught (in promise) DOMException: The play() request was interrupted by a new load request
        // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
        function playVideo(item) {
          let playPromise = item.play();

          if (playPromise !== undefined) {
            playPromise.then(_ => {
              // Automatic playback started!
              // Show playing UI.
            })
            .catch(error => {
              // Auto-play was prevented
              // Show paused UI.
            });
          }
        }

        playVideo(vid);


        if (targetPosition.top > windowPosition.top &&
          targetPosition.bottom < windowPosition.bottom) {
          // Если элемент полностью видно, то запускаем следующий код
          playVideo(vid);
        } else {
          // Если элемент не видно, то запускаем этот код
          vid.pause();
        };
      });
    });

  };


  // прелоадер загрузки контента
  function hidePreloader() {
      const preloader = document.querySelector('#preloader');
      setInterval(() => {
        preloader.style= 'opacity: 0';
        setInterval(() => {
          preloader.remove();
        }, 1000);
      }, 1000);
  }

  window.addEventListener('load', load);
});
