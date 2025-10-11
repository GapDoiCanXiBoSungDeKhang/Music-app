const btnFavourite = document.querySelector('.button-favourite');

if (btnFavourite) {
    btnFavourite.addEventListener('click', () => {
        btnFavourite.classList.toggle('active');
        const icon = btnFavourite.querySelector('i');
        icon.style.animation = 'none';
        icon.offsetHeight; // force reflow
        icon.style.animation = ''; // animation sẽ chạy lại
    });
}