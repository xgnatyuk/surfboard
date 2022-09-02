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

const form = document.querySelector('#form_order')
const phone = document.querySelector('#phone')
const sendBtn = document.querySelector('#send_btn')

phone.addEventListener('keydown', (e) => {
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
    e.preventDefault()
}

})


sendBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if(isFormValid(form)) {
        console.log('send to server')
    }
    else {
        console.log('do not send to server, form is invalid')
    }
})

function isFormValid(form) {
    let isValid = true 

    if(!validation(form.elements.name)) {
        isValid = false
    }
    if(!validation(form.elements.phone)) {
        isValid = false
    }
    if(!validation(form.elements.comment)) {
        isValid = false
    }
    return isValid
}

function validation(element) {
    if(!element.checkValidity()) {
        element.nextElementSibling.textContent = element.validationMessage
        element.classList.add('form__input-error')
        return false
    }
    else {
        element.nextElementSibling.textContent = ''
        element.classList.remove('form__input-error')
        return true
    }
}