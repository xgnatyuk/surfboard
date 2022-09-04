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

// form validation 

// const form = document.querySelector('#form_order')
// const phone = document.querySelector('#phone')
// const sendBtn = document.querySelector('#send_btn')

// phone.addEventListener('keydown', (e) => {
// try {
//     let isDigit = false 
//     let isPlus = false 
//     let isDash = false 
//     let isAction = false

//     if(e.key >= 0 || e.key <= 9) {
//        isDigit = true
//     }

//     if (e.key == '+') {
//         isPlus = true
//     }

//     if (e.key == '-') {
//         isDash = true
//     }

//     if (e.key == 'ArrowRight' || 
//         e.key == 'ArrowLeft' ||
//         e.key == 'Backspace'
//     ) { 
//         isAction = true
//     }

//     if(!isDigit && !isPlus && !isDash && !isAction) {
//     throw new Error ('Можно вводить только цифры, +, -')
//     }
//     e.target.nextElementSibling.textContent = ''
//     e.target.classList.remove('form__input-error')

// } catch (error) {
//     e.target.nextElementSibling.textContent = error.message
//     e.target.classList.add('form__input-error')
//     e.preventDefault()
    
// }

// })


// sendBtn.addEventListener('click', (e) => {
//     e.preventDefault()
//     if(isFormValid(form)) {
//         console.log('send to server')
//     }
//     else {
//         console.log('do not send to server, form is invalid')
//     }
// })

// function isFormValid(form) {
//     let isValid = true 

//     if(!validation(form.elements.name)) {
//         isValid = false
//     }
//     if(!validation(form.elements.phone)) {
//         isValid = false
//     }
//     if(!validation(form.elements.comment)) {
//         isValid = false
//     }
//     return isValid
// }

// function validation(element) {
//     if(!element.checkValidity()) {
//         element.nextElementSibling.textContent = element.validationMessage
//         element.classList.add('form__input-error')
//         return false
//     }
//     else {
//         element.nextElementSibling.textContent = ''
//         element.classList.remove('form__input-error')
//         return true
//     }
// }

// modal 

// $('.form').submit(e => {
//     e.preventDefault();
//     const fancybox = Fancybox.show(
//         {
//           src: "#modal",
//           type: "inline",
//         })
//     });


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
    // const fancybox = new Fancybox([
    //         {
    //           src: "#modal",
    //           type: "inline",
    //         },
    //     ]);
    
    //     $('.js-submit-btn').click(e =>{
    //     e.preventDefault();

    //     fancybox.close();
    // });   
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
 
