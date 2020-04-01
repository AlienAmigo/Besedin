function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

window.addEventListener('load', hidePreloader);

// прелоадер загрузки контента
function hidePreloader() {
    console.log('Content loaded');
    const preloader = document.querySelector('#preloader');
    setInterval(() => {
      preloader.style= 'opacity: 0';
      setInterval(() => {
        preloader.remove();
      }, 1000);
    }, 1000);
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


  // РАБОТА С ВИДЕО


  // //соединяемся с API Youtube
  // let tag = document.createElement('script');
  // tag.src = "https://www.youtube.com/iframe_api";
  // let firstScriptTag = document.getElementsByTagName('script')[0];
  // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // function checkPosition(link){
  //   //функция проверки видимости элемента на jquery
  //   let div_position = $(link).offset();
  //   let div_top = div_position.top;
  //   let div_left = div_position.left;
  //   let div_width = $(link).width();
  //   let div_height = $(link).height();
  //   let top_scroll = $(document).scrollTop();
  //   let left_scroll = $(document).scrollLeft();
  //   let screen_width = $(window).width();
  //   let screen_height = $(window).height()+600;
  //   let see_x1 = left_scroll;
  //   let see_x2 = screen_width + left_scroll;
  //   let see_y1 = top_scroll;
  //   let see_y2 = screen_height + top_scroll;
  //   let div_x1 = div_left;
  //   let div_x2 = div_left + div_height;
  //   let div_y1 = div_top;
  //   let div_y2 = div_top + div_width;
  //   if( div_x1 >= see_x1 && div_x2 <= see_x2 && div_y1 >= see_y1 && div_y2 <= see_y2 ) {
  //   //если элемент видим на экране, запускаем видео Youtube
  //     player.playVideo();
  //   } else{
  //   //если не видим, ставим видео на паузу
  //     player.pauseVideo();
  //   }
  // }

  // //запускаем функцию проверки видимости элемента
  // $(document).scroll(function() {
  //   checkPosition();
  // });
  // $(window).resize(function(){
  //   checkPosition();
  // });


  // function onYouTubeIframeAPIReady() {
  //   //рисуем видеопроигрыватель Youtube
  //   player = new YT.Player('video-placeholder', {
  //     width: 600,
  //     height: 400, //размеры окна видео
  //     playerVars: {
  //       'autoplay': 1,
  //       'controls': 0,
  //       'showinfo': 0,
  //       'rel': 0
  //     }, //тонкие настройки видеопроигрывателя
  //   videoId: 'fqesxT90x8g', //здесь id ролика
  //   });
  // }

  // const dynamicVideo = $('.dynamic-video');
  // const $window = $(window);

  // $window.scroll(function() {

  //   let $topOfVideo = dynamicVideo.offset().top;
  //   let $bottomOfVideo = dynamicVideo.offset().top + dynamicVideo.outerHeight();

  //   let $topOfScreen = $window.scrollTop();
  //   let $bottomOfScreen = $window.scrollTop() + $window.innerHeight();

  //   if(($bottomOfScreen > $bottomOfVideo) && ($topOfScreen < $topOfVideo)){
  //     dynamicVideo[0].play();
  //   } else {
  //     dynamicVideo[0].pause();
  //   }
  // });

  // ============
  var $video = $('.video');
  var $window = $(window);
  $video[0].play();

  $window.scroll(function() {

    var $topOfVideo = $video.offset().top;
    var $bottomOfVideo = $video.offset().top + $video.outerHeight();

    var $topOfScreen = $window.scrollTop();
    var $bottomOfScreen = $window.scrollTop() + $window.innerHeight();

    if(($bottomOfScreen > $bottomOfVideo) && ($topOfScreen < $topOfVideo)){
      $video[0].play();
    } else {
      $video[0].pause();
    }

  });

});
