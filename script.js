// slider
   const slider = $('.products__list').bxSlider({
        pager: false,
        controls: false

    });
    $('.products__arrow-left').click(e => {
        e.preventDefault();
        slider.goToPrevSlide();
      })
      
      $('.products__arrow-right').click(e => {
        e.preventDefault();
        slider.goToNextSlide();
      })

//map 

let myMap; 
const init = () => {
    myMap = new ymaps.Map("map", {
        center: [54.188259, 37.637909],
        zoom: 14,
        controls: []
    });
const coords = [
[54.194398, 37.605738],
[54.189724, 37.617155],
[54.183599, 37.600009]
];

const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false, 
    iconLayout: 'default#image',
    iconImageHref: "./icons/map-icon.svg",
    iconImageSize: [46, 57],
    iconImageOffSet: [-35, -52]

})

coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
})
myMap.geoObjects.add(myCollection);
}

ymaps.ready(init);

// player 

let player;
const playerContainer = $(".player");

let eventsInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();

    if (playerContainer.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $(".player__playback").click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

    $(".player__playback-button").css({
      left: `${newButtonPositionPercent}%`
    });

    player.seekTo(newPlaybackPositionSec);
  });

  $(".player__splash").click(e => {
    player.playVideo();
  })

  $(".player__volume").click(e => {
    const barVolume = $(e.currentTarget);
    const clickedPositionVolume = e.originalEvent.layerX;
    const newButtonPositionVolume = (100 * clickedPositionVolume / barVolume.width());
    player.setVolume(newButtonPositionVolume);

    $(".player__volume-button").css({
      left: `${newButtonPositionVolume}%`
    });
  });
};

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });

    $(".player__duration-competed").text(formatTime(completedSec));
  }, 1000);
}

const onPlayerStateChange = event => {
 
  switch (event.data) {
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("paused");
      break;

    case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: "392",
    width: "662",
    videoId: "oANeSfTDaoo",
    events: {
      "onReady": onPlayerReady,
      "onStateChange": onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();

// fullscreen menu
class FullMenu {
    constructor(selector) {
        this.menu = document.querySelector(selector)
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-menu]')
            if (target) {
                const event = target.dataset.menu
                this[event]()
            }
        })
    }
    open() {
        this.menu.classList.add('open')
    }
    close() {
        this.menu.classList.remove('open')
    }
}
var menu = new FullMenu('#full-menu')




// reviews tabs 
const findBlockByAlias = alias => {
    return $(".reviews__display-item").filter((ndx, item) => {
        return $(item).attr("data-linked-with") === alias;
    });
};

$(".interactive-avatar__link").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".reviews__switcher-item");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");
});

// team 
const teamMember = document.getElementsByClassName("team__member");
const teamInfo = document.getElementsByClassName("team__info");
const triangleUp = document.getElementsByClassName("team__triangle-up");
const triangle = document.getElementsByClassName("team__triangle");

for (let i = 0; i < teamMember.length; i++) {
    teamMember[i].addEventListener('click', function(){ 
        teamInfo[i].classList.toggle('hidden');
        triangleUp[i].classList.toggle('hidden');
        triangle[i].classList.toggle('hidden');
        for (let a = 0; a < teamMember.length; a++) {
            if (a !== i) {
                if(!teamInfo[a].classList.contains('hidden')) {
                    teamInfo[a].classList.add('hidden');
                    triangleUp[a].classList.add('hidden');
                    triangle[a].classList.remove('hidden');
                }
            }
        }
    });
};


// form 

    phone.addEventListener('keydown', (e) => {
try {
    let isDigit = false 
    let isPlus = false 
    let isDash = false 
    let isAction = false

    if(e.key >= 0 || e.key <= 9) {
       isDigit = true
    }

    if (e.key == '+') {
        isPlus = true
    }

    if (e.key == '-') {
        isDash = true
    }

    if (e.key == 'ArrowRight' || 
        e.key == 'ArrowLeft' ||
        e.key == 'Backspace'
    ) { 
        isAction = true
    }

    if(!isDigit && !isPlus && !isDash && !isAction) {
    throw new Error ('Можно вводить только цифры, +, -')
    }
    e.target.nextElementSibling.textContent = ''
    e.target.classList.remove('form__input-error')

} catch (error) {
    e.target.nextElementSibling.textContent = error.message
    e.target.classList.add('form__input-error')
    e.preventDefault()
    
}

})




$('.form').submit(e => {
    e.preventDefault();
    
    const form  = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $('#modal');
    const content = modal.find(".modal__message");

    modal.removeClass("error-modal");

    const validateFields = (form, fieldsArray) => {
    
        fieldsArray.forEach(field => {
          field.removeClass("form__input-error");
          if (field.val().trim() === "") {
            field.addClass("form__input-error");
          }
        
        })
    
        const errorFields = form.find(".form__input-error");
    
        return errorFields.length === 0;
      }

    const isValid = validateFields(form, [name, phone, comment, to]);

    if (isValid) {
    $.ajax({
        url: "https://webdev-api.loftschool.com/sendmail", 
        method: "post",
        data: {
            name: name.val(),
            phone: phone.val(),
            comment: comment.val(),
            to: to.val(),
        },

        success: data => {
            content.text(data.message)
            const fancybox = new Fancybox([
                {
                  src: "#modal",
                  type: "inline",
                },
            ]);
        
            $('.js-submit-btn').click(e =>{
            e.preventDefault();
    
            fancybox.close();
        }); 
        },

        error: data => {
            const message = data.responseJSON ? data.responseJSON.message:"Отправить письмо не удалось, повторите запрос позднее";
            content.text(message);
          

            const fancybox = new Fancybox([
                {
                  src: "#modal",
                  type: "inline",
                },
            ]);
        
            $('.js-submit-btn').click(e =>{
            e.preventDefault();
    
            fancybox.close();
        }); 
        }
    })
}
})





// products-menu 

    const mesureWidth = item => {
      let reqItemWidth = 0;
  
      const screenWidth = $(window).width();
      const container = item.closest(".products-menu__list");
      const titlesBlocks = container.find(".products-menu__title");
      const titleWidth = titlesBlocks.width() * titlesBlocks.length;
  
      const textContainer = item.find(".products-menu__container");
      const paddingLeft = parseInt(textContainer.css("padding-left"));
      const paddingRight = parseInt(textContainer.css("padding-right"));
  
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
      if (isMobile) {
        reqItemWidth = screenWidth - titleWidth;
      } else {
        reqItemWidth = 524;
      }
  
      return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingRight - paddingLeft
      }
    }
  
    const closeEveryItemInContainer = container => {
      const items = container.find(".products-menu__item");
      const content = container.find(".products-menu__content");
  
      items.removeClass("active");
      content.width(0);
    }
  
    const openProductsMenu = item => {
      const hiddenContent = item.find(".products-menu__content");
      const reqWidth = mesureWidth(item);
      const textBlock = item.find(".products-menu__container");
  
      item.addClass("active");
      hiddenContent.width(reqWidth.container);
      textBlock.width(reqWidth.textContainer);
    }
  
    $(".products-menu__title").click((e) => {
      e.preventDefault();
  
      const $this = $(e.currentTarget);
      const item = $this.closest(".products-menu__item");
      const itemOpened = item.hasClass("active");
      const container = $this.closest(".products-menu__list")
  
      if (itemOpened) {
        closeEveryItemInContainer(container)
      } else {
        closeEveryItemInContainer(container)
        openProductsMenu(item);
      }
    })
 
// ops

const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");



sections.first().addClass("active");

const countSectionPosition = sectionEq => {
    return sectionEq * -100;
}

const changeMenuThemeForSection = sectionEq => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "fixed-menu--shadowed";

    if(menuTheme === "black") {
        sideMenu.addClass(activeClass)

    } else {
        sideMenu.removeClass(activeClass)

    }
}
let inScroll = false; 

const resectActiveClassForItem = (items, itemsEq, activeClass) => {
    items.eq(itemsEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = sectionEq => {
    if (inScroll === false) {
        
        inScroll = true;
       const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);
       
    display.css({
        transform: `translateY(${position}%)`,
      })
    
    resectActiveClassForItem(sections, sectionEq, "active");

   
    setTimeout(() => {
        inScroll = false;

        resectActiveClassForItem(menuItems, sectionEq,"fixed-menu__item--active"); 

    }, 1300);

    }
};

const scrollViewport = direction => {

    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === "next" && nextSection.length) {
        performTransition(nextSection.index())

    }

    if (direction === "prev" && prevSection.length) {
        performTransition(prevSection.index())
    }
}

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    if (deltaY > 0) {
        scrollViewport("next");
        
    }

    if (deltaY < 0) {
        scrollViewport("prev");
       
    }
    console.log(deltaY);
})


$(window).on("kedydown", e => {

const tagName = e.target.tagName.toLowerCase();
if (tagName !== "input" && tagName !== "textarea") {
     switch (e.keycode) {
    case 38:
        scrollViewport("prev");
        break;
 
    case 40:
        scrollViewport ("next");
        break;
 }
}

})

$(".wrapper").on("touchmove", e =>{
    e.preventDefault();
})

$("[data-scroll-to]").click(e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`)

    performTransition(reqSection.index());
})


        $("body").swipe( {
        swipe: function
        (event, 
        direction
        )
    {
       const scroller = viewportScroller();
       let scrollDirection = "";
       
       if(direction === "up") scrollDirection = "next";
       if(direction === "down") scrollDirection = "prev";

       scroller[scrollDirection]();
     
      }
});


