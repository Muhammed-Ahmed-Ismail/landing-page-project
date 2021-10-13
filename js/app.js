/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
/* Defining useful classes */

class Li { // Class of Li to handel Li elements addition to the Nav-menu
    ul = document.querySelector("ul#navbar__list"); // Getting the Ul element from the DOM
    constructor(cont) { // constructor for the Li objects using the cont argument to initialize the content datamember in the li object
        this.content = cont;
        this.appendToParent(cont);

    };
    appendToParent(cont) { // append the created li element to the ul and giving it data-vav's value as the section it referes to
        const ele = document.createElement("li");
        ele.className = "menu__link";
        ele.innerText = this.content;
        ele.setAttribute("data-nav", `${cont}`)
        this.ul.appendChild(ele);
    }

}

// define some useful global variables
const sections = document.querySelectorAll("section");
const ul = document.querySelector('ul');
const main_ele = document.querySelector("main");

// build the nav

for (const section of sections) { // looping over the existing section elements to create nav-menu
    makeNav(section)
}
// adding a mutation observer to listen to any changes in the main element 
const config = { // configure the observer to catch if a new section is added to the main element 
    childList: true
};
const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
        let added_section = mutation.addedNodes[0];
        makeNav(added_section)
    }
});
observer.observe(main_ele, config);
// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', () => {
    let sections = document.querySelectorAll("section");
    for (const section of sections) {
        let topOfSection = section.getBoundingClientRect().top;
        let bottomOfScetion = section.getBoundingClientRect().bottom;
        if (topOfSection <= 300 && topOfSection >= -300) {
            let active_sec_id = section.id;
            for (const section of sections) {
                let nav = section.getAttribute("data-nav")
                let sec_li = document.querySelector(`li[data-nav="${nav}"]`);
                if (section.id === active_sec_id) {
                    section.className = "your-active-class";
                    sec_li.className = "menu__link your-active-class";

                } else {
                    section.className = "";
                    sec_li.className = "menu__link";
                }
            }
        }
    }
})
// Scroll to anchor ID using scrollTO event
ul.addEventListener('click', (event) => {
    let li_ele = event.target;
    //let sec_id = li_ele.id;
    let nav = li_ele.getAttribute("data-nav")
    console.log(nav)
    sec_ele = document.querySelector(`section[data-nav="${nav}"]`);
    console.log(sec_ele)
    sec_ele.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
    });
})

// add useful functions 
function makeNav(section) { // function responsible of creating   li objects which are added to the ul
    let sec = section.getAttribute("data-nav");
    let id = section.id;
    new Li(sec, id);
}