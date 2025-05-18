const modalTriggers = document.querySelectorAll('[id^="modalTrigger"]');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-button');

// Get the scrollbar width
function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

function preventScroll() {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
}

function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}

function closeModal(modal) {
    modal.classList.add('hidden');
    enableScroll();
}

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const modalId = trigger.id.replace('modalTrigger', 'modal');
        const modal = document.getElementById(modalId);
        modal.classList.remove('hidden');
        preventScroll();
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});
