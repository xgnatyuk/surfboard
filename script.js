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



// const targetDiv = document.getElementById("element");
// const parametres = document.getElementById("parametres-btn");
// parametres.onclick = function() {
//     if (targetDiv.style.display == "none") {
//         targetDiv.style.display = "block";
//     } else {
//         targetDiv.style.display = "none";
//     }
// };