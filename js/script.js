$(document).ready(function () {

  $('html').css('overflow', 'hidden');

  let modalWrap = $('.modal-wrap');
  let modalClose = $('.modal-close');
  let modalOpen = $('.modalopen');
  let modalCloseFn = () => {
    modalWrap.stop().fadeOut(200);
    $('html').css('overflow', 'auto');
    modalOpen.show();
  }

  modalOpen.hide();
  modalClose.click(function () {
    modalCloseFn();
  });
  $('html').keydown(function (key) {
    if (key.keyCode) {
      modalCloseFn();
    }
  });

  let modalMain = $('.modal-main');
  modalMain.click(function (event) {
    event.stopPropagation();
  });
  modalWrap.click(function () {
    modalCloseFn();
  });

  modalOpen.click(function(){
    modalWrap.stop().fadeIn(200);
    $('html').css('overflow', 'hidden');
    modalOpen.hide();
  });



  let mobileMenu = $('.mobile-menu');
  let mobileBt = $('.all-menu');
  mobileBt.click(function (event) {
    event.preventDefault();
    let wW = window.innerWidth;
    if (wW > 1000) {
      return;
    }
    mMainMenu.removeClass('m-mainmenu-active');
    mSubMenu.hide();
    mDepth3.hide();

    mobileMenu.toggleClass('mobile-menu-active');
    let temp = mobileMenu.hasClass('mobile-menu-active');
    if (temp) {
      $('html').css('overflow', 'hidden');
      $(this).find('img').attr('src', 'images/search_close.png');
    } else {
      $('html').css('overflow-y', 'auto');
      $(this).find('img').attr('src', 'images/main_allmenu.png');
    }
  });

  let mMenu = $('.m-menu');
  let mMenuLi = $('.m-menu > li');
  let mMainMenu = $('.m-mainmenu');
  let mSubMenu = $('.m-submenu');
  let mDepth3 = $('.m-depth3');

  $.each(mMenuLi, function (index, item) {

    let depth1 = $(this).find('.m-mainmenu');
    depth1.click(function (event) {
      event.preventDefault();
      let temp = $(this).hasClass('m-mainmenu-active');

      if (temp) {
        $(this).removeClass('m-mainmenu-active');
        $(this).next().stop().slideUp();

      } else {
        mMainMenu.removeClass('m-mainmenu-active');
        $(this).addClass('m-mainmenu-active');
        mSubMenu.stop().slideUp();
        $(this).next().stop().slideDown();
      }
      mDepth3.stop().slideUp();
    });
  });

  $.each(mSubMenu, function (index, item) {
    let mSubMenuA = $(this).find('> li > a');

    mSubMenuA.click(function (event) {
      let depth3 = $(this).next();

      if (depth3.length) {
        event.preventDefault();
        let tempShow = depth3.css('display');
        if (tempShow == 'none') {
          mDepth3.stop().slideUp();
          depth3.stop().slideDown();
        } else {
          depth3.stop().slideUp();
        }
      }
    });
  });

  let section = $('.wrap > section');
  let footer = $('.footer');

  let sectionSpeed = 500;
  let sectionPos = [];
  let sectionIndex = 0;
  let scrollIng = false;
  let wheelIng = true;
  let sectionMenu = $('.section-menu');

  function wheelCheckFn() {
    let wW = window.innerWidth;
    if (wW <= 1000) {
      wheelIng = false;
      sectionMenu.hide();
    } else {
      wheelIng = true;
      sectionMenu.show();
      mobileMenu.removeClass('mobile-menu-active');
      mobileBt.find('img').attr('src', 'images/main_allmenu.png');
    }
  }

  wheelCheckFn();

  $(window).resize(function () {
    wheelCheckFn();
  });

  function resetSection() {

    $.each(section, function (index, item) {
      let tempY = $(this).offset().top;
      tempY = Math.ceil(tempY);
      sectionPos[index] = tempY;
    });
    sectionPos[sectionPos.length] = Math.ceil(footer.offset().top);
  }

  resetSection();

  let sectionTotal = sectionPos.length;

  $(window).resize(function () {
    resetSection();

    if (wheelIng) {
      sectionColor();
      gsap.to($('html'), sectionSpeed / 1000, {
        scrollTo: sectionPos[sectionIndex],
        onComplete: function () {
          scrollIng = false;
        }
      });
    }
  });

  $(window).scroll(function () {

    if (wheelIng) {
      return;
    }
    let tempY = $(window).scrollTop();
    tempY = Math.ceil(tempY);
    for (let i = sectionTotal - 1; i >= 0; i--) {
      let tempMax = sectionPos[i];
      if (tempY >= tempMax) {
        sectionIndex = i;
        break;
      }
    }
  });

  $(window).bind('mousewheel DOMMouseScroll', function (event) {
    let distance = event.originalEvent.wheelDelta;
    if (distance == null) {
      distance = event.originalEvent.detail * -1;
    }
    if (wheelIng != true) {
      return;
    }
    if (scrollIng) {
      return;
    }
    scrollIng = true;
    if (distance < 0) {
      sectionIndex++;
      if (sectionIndex >= sectionTotal) {
        sectionIndex = sectionTotal - 1;
      }
    } else {
      sectionIndex--;
      if (sectionIndex <= 0) {
        sectionIndex = 0;
      }
    }

    sectionColor();
    gsap.to($('html'), sectionSpeed / 1000, {
      scrollTo: sectionPos[sectionIndex],
      onComplete: function () {
        scrollIng = false;
      }
    });
  });

  let sectionLink = $('.section-menu a');
  $.each(sectionLink, function (index, item) {
    $(this).click(function (event) {
      event.preventDefault();
      moveSection(index);
    });
  });

  function moveSection(_index) {
    sectionIndex = _index;

    sectionColor();

    gsap.to($('html'), sectionSpeed / 1000, {
      scrollTo: sectionPos[sectionIndex],
      onComplete: function () {
        scrollIng = false;
      }
    });

  }

  function sectionColor() {
    sectionLink.removeClass('section-menu-active');
    sectionLink.eq(sectionIndex).addClass('section-menu-active');
    sectionLink.removeClass('section-menu-blue');
    if (sectionIndex != 2 && sectionIndex != 5) {
      sectionLink.addClass('section-menu-blue');
    }
  }
  sectionColor();

  let searchBt = $('.search-bt');
  let searchWrap = $('.search-wrap');

  searchWrap.click(function (event) {
    event.stopPropagation();
  });

  searchBt.click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    searchWrap.stop().fadeToggle(300);

    let imgName = $(this).find('img').attr('src');

    if (imgName == 'images/main_search.png') {
      $(this).find('img').attr('src', 'images/search_btn_close.png');
      $(this).css('background', '#3d66c4');
    } else {
      $(this).find('img').attr('src', 'images/main_search.png');
      $(this).css('background', '#fff');
    }

  });

  $('body').click(function () {
    searchWrap.stop().fadeOut(300);
    searchBt.find('img').attr('src', 'images/main_search.png');
    searchBt.css('background', '#fff');
  });

  let footerSite = $('.footer-site');
  let siteList = $('.site-list');

  footerSite.click(function () {

    let temp = $(this).hasClass('footer-site-open');
    if (temp == true) {
      siteList.stop().slideUp(500);
      $(this).removeClass('footer-site-open');
    } else {
      siteList.stop().slideDown(500);
      $(this).addClass('footer-site-open');
    }
  });

  footerSite.mouseleave(function () {
    siteList.stop().slideUp(500);
    $(this).removeClass('footer-site-open');
  });

});


window.onload = function () {
  let rNum = Math.floor(Math.random() * 3);
  let rClass = 'about-box-char-' + rNum;
  let rTag = $('.about-box-sns');
  rTag.addClass(rClass);

  let header = $('.header');
  let gnb = $('.gnb');
  let gnbH = gnb.height();

  gnb.mouseenter(function () {
    header.css('height', gnbH);
  });
  gnb.mouseleave(function () {
    header.css('height', 70);
  });

  let swVisualPc = new Swiper('.sw-visual', {
    slidesPerView: 3,
    grid: {
      rows: 2,
    },
    loop: true,
    navigation: {
      prevEl: '.sw-visual-prev',
      nextEl: '.sw-visual-next'
    },
    breakpoints: {
      760: {
        slidesPerView: 4,
        grid: {
          rows: 1,
        },
      },
      800: {
        slidesPerView: 4,
        grid: {
          rows: 1,
        },
      },
      960: {
        slidesPerView: 5,
        grid: {
          rows: 1,
        },
      },
      1080: {
        slidesPerView: 6,
        grid: {
          rows: 1,
        },
      },
      1200: {
        slidesPerView: 7,
        grid: {
          rows: 1,
        },
      },
      1260: {
        slidesPerView: 8,
        grid: {
          rows: 1,
        },
      },
    },
  });
  let swVisualMb = new Swiper('.sw-visual-mb', {
    resistance: true,
    resistanceRatio: 0
  });

  $('.visual-mb').click(function (event) {
    event.stopPropagation();
    $('.visual-mb-ani').fadeOut();
  });

  let swAbout = new Swiper('.sw-about', {
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    speed: 500,
    pagination: {
      el: '.sw-about-pg',
      type: 'fraction'
    },
    navigation: {
      nextEl: '.sw-about-next',
      prevEl: '.sw-about-prev'
    },
    allowTouchMove: false
  });

  let swAboutBt = $('.sw-about-pause');
  swAboutBt.click(function () {
    let temp = $(this).hasClass('sw-about-play');
    if (temp == true) {
      swAbout.autoplay.start();
      $(this).removeClass('sw-about-play');
    } else {
      swAbout.autoplay.stop();
      $(this).addClass('sw-about-play');
    }
  });

  let swSid = new Swiper('.sw-sid', {
    loop: true,
    pagination: {
      el: '.sw-sid-pg',
      type: 'fraction'
    },
    navigation: {
      prevEl: '.sw-sid-prev',
      nextEl: '.sw-sid-next'
    },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    observer: true,
    observeParents: true,
  });

  let swSidPause = $('.sw-sid-pause');
  swSidPause.click(function () {
    let temp = $(this).hasClass('sw-sid-play');
    if (temp == false) {
      $(this).addClass('sw-sid-play');
      swSid.autoplay.stop();
    } else {
      $(this).removeClass('sw-sid-play');
      swSid.autoplay.start();
    }
  });


  let swNewsListOpt = {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 12,
    breakpoints: {
      700: {
        slidesPerView: 3,
      },
      900: {
        slidesPerView: 4,
      }
    },
    navigation: {
      prevEl: '.sw-news-list-prev',
      nextEl: '.sw-news-list-next'
    }
  };

  let swNewsList;
  $(window).resize(function () {
    let wW = window.innerWidth;

    if (wW <= 1000) {
      if (swNewsList == undefined) {
        swNewsList = new Swiper('.sw-news-list', swNewsListOpt);
      }
    } else {
      if (swNewsList != undefined) {
        swNewsList.destroy();
        swNewsList = undefined;
      }
    }

  });

  // 최초 진입 및 새로 고침 시에도 체크
  let wW = window.innerWidth;
  if (wW <= 1000) {
    if (swNewsList == undefined) {
      swNewsList = new Swiper('.sw-news-list', swNewsListOpt);
    }
  } else {
    if (swNewsList != undefined) {
      swNewsList.destroy();
      swNewsList = undefined;
    }
  }

  let newsBottomMenu = $('.news-bottom-menu > a');
  let newsBottomCont = [
    $('.news-box-bot').eq(1),
    $('.news-box-bot').eq(2),
    $('.news-box-bot').eq(3)
  ];

  let newsBottomIdx = 0;

  $.each(newsBottomMenu, function (index, item) {
    $(this).click(function (event) {
      event.preventDefault();
      newsBottomMenu.removeClass('news-bottom-menu-active');
      $(this).addClass('news-bottom-menu-active');
      newsBottomCont[0].hide();
      newsBottomCont[1].hide();
      newsBottomCont[2].hide();
      newsBottomCont[index].show();

    });
  });


  $(window).resize(function () {
    let wW = $(window).width();
    if (wW > 630) {
      newsBottomCont[0].removeAttr('style');
      newsBottomCont[1].removeAttr('style');
      newsBottomCont[2].removeAttr('style');
    } else {
      $.each(newsBottomMenu, function (index, itme) {
        let temp = $(this).hasClass('news-bottom-menu-active');
        if (temp) {
          newsBottomCont[0].hide();
          newsBottomCont[1].hide();
          newsBottomCont[2].hide();
          newsBottomCont[index].show();
        }
      });
    }

  });
};