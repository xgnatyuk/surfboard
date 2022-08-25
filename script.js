//fullscreen menu
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