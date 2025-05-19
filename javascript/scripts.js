const modalTriggers = document.querySelectorAll('[id^="modalTrigger"]');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-button');

const modalImageStates = {};

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
    const modalId = modal.id;
    modalImageStates[modalId] = 1;
    const mainImage = modal.querySelector('.flex-row img:first-child');
    if (mainImage) {
        mainImage.src = mainImage.src.replace(/m\d+p\d+/, `m${modalId.replace('modal', '')}p1`);
    }
}

function handleNextClick(e, modal) {
    e.stopPropagation();
    const modalId = modal.id;
    const mainImage = modal.querySelector('.flex-row img:first-child');
    if (!mainImage) return;

    modalImageStates[modalId] = (modalImageStates[modalId] || 1) + 1;
    const currentNumber = modalImageStates[modalId];
    const modalNumber = modalId.replace('modal', '');

    const testImage = new Image();
    testImage.src = mainImage.src.replace(/m\d+p\d+/, `m${modalNumber}p${currentNumber}`);

    testImage.onerror = () => {
        modalImageStates[modalId] = 1;
        mainImage.src = mainImage.src.replace(/m\d+p\d+/, `m${modalNumber}p1`);
    };

    testImage.onload = () => {
        mainImage.src = testImage.src;
    };
}

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const modalId = trigger.id.replace('modalTrigger', 'modal');
        const modal = document.getElementById(modalId);
        modal.classList.remove('hidden');
        preventScroll();
        
        modalImageStates[modalId] = 1;
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

document.querySelectorAll('.modal .flex-row img[alt="Next"]').forEach(nextButton => {
    nextButton.addEventListener('click', (e) => {
        const modal = nextButton.closest('.modal');
        handleNextClick(e, modal);
    });
});
