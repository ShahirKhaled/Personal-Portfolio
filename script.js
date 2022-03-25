const preloader = document.querySelector('.preloader');
const menuContainer = document.querySelector('.menu-container');
const menuElements = document.querySelectorAll('.menu-container,.hamburger-container,nav,ul li');
const progressBars = document.querySelectorAll('[data-increase-width]');
const lazyLoadingElements = document.querySelectorAll('[data-loading-animation], [data-animate-rtl], [data-animate-ltr]');
const headerChildren = document.querySelectorAll('header>*');
const sectionTwo = document.querySelector('.section-2');
const header = document.querySelector('header');
const formLink = document.querySelector('form a');
const formInputs = document.querySelectorAll('#subject, #message, #email');
const errorMessage = document.querySelector('form>p');

window.addEventListener('load', () => {
    document.body.classList.remove('stop-scrolling');
    headerChildren.forEach(item => item.classList.remove('hide'));
    preloader.classList.add('remove');
    setTimeout(() => document.querySelector('.preloader.remove').remove(), 1000);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('show', entry.isIntersecting));
    }, { rootMargin: '-100px 0px' });
    
    lazyLoadingElements.forEach(element => observer.observe(element));

    const anotherObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('scale-x', entry.isIntersecting));
    }, { rootMargin: '-70px 0px' });
});

menuContainer.addEventListener('click', e => {
    if (e.target.matches('nav *:not(a),nav')) return;
    else menuElements.forEach(element => element.classList.toggle('open'));
});

function myFunction() {
    let array = [];
    formInputs.forEach((item, index) => {
        if (item.value === '') return;
        const firstIndexCondition = index === 0 && item.value.includes('@') && item.value.endsWith('@');
        if (index === 0 && !/@/g.test(item.value) || firstIndexCondition) return;
        array.push(item.value);
    });
    if (array.length < 3) {
        formLink.removeAttribute('href');
        errorMessage.style.display = 'block';
        return;
    }
    formLink.href = 'mailto:shahirkhaled02@gmail.com' + '?subject=' + array[0] + '&body=' + array[1];
    errorMessage.style.display = 'none';
}

window.addEventListener('scroll', () => {
    const sectionTwoSize = sectionTwo.getBoundingClientRect();
    const removingCondition = sectionTwoSize.bottom < header.scrollHeight || sectionTwoSize.top > header.scrollHeight;
    if (sectionTwoSize.top < header.scrollHeight) header.classList.add('add');
    if (removingCondition) header.classList.remove('add');
})