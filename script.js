const menuContainer = document.querySelector('.menu-container');
const preloader = document.querySelector('.preloader');
const menuElements = document.querySelectorAll('.menu-container,.hamburger-container,nav,ul li');
const progressBars = document.querySelectorAll('[data-increase-width]');
const sectionOne = document.querySelectorAll('[data-loading-animation], [data-animate-rtl], [data-animate-ltr]');
const header = document.querySelectorAll('[data-header]');
const formLink = document.querySelector('form a');
const formInputs = document.querySelectorAll('#subject, #message');
const errorMessage = document.querySelector('form>p');

menuContainer.addEventListener('click', e => {
    if (e.target.matches('nav *:not(a),nav')) return;
    else menuElements.forEach(element => element.classList.toggle('open'));
});

function myFunction() {
    let array = [];
    formInputs.forEach(item => {
        if (item.value === '') return;
        array.push(item.value);
    });
    if (array.length < 2) {
        formLink.removeAttribute('href');
        errorMessage.style.display = 'block';
        return;
    }
    formLink.href += '?subject=' + array[0] + '&body=' + array[1];
}

window.addEventListener('load', () => {
    document.body.classList.remove('stop-scrolling');
    header.forEach(item => item.classList.remove('hide'));
    preloader.classList.add('remove');
    setTimeout(() => document.querySelector('.preloader.remove').remove(), 1000);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('show', entry.isIntersecting);
        });
    }, { rootMargin: '-100px 0px' });
    
    sectionOne.forEach(element => observer.observe(element));

    const anotherObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('scale-x', entry.isIntersecting));
    }, { rootMargin: '-70px 0px' });

    progressBars.forEach(element => anotherObserver.observe(element));
});