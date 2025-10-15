const btnFavourite = document.querySelector('.button-favourite');

if (btnFavourite) {
    btnFavourite.addEventListener('click', async () => {
        const span = btnFavourite.querySelector('span');
        const getDataID = span.getAttribute('data-id');
        const isActive = btnFavourite.classList.contains('active');
        const typeFav = isActive ? 'disfav' : 'fav';
        const link = `/song/favourite/${typeFav}/${getDataID}`;

        try {
            await fetch(link, { method: 'PATCH' });

            btnFavourite.classList.toggle('active');
            const icon = btnFavourite.querySelector('i');
            icon.style.animation = 'none';
            icon.offsetHeight; // force reflow
            icon.style.animation = ''; // animation sẽ chạy lại
        } catch (err) {
            console.error('Lỗi khi yêu thích bài hát:', err);
        }
    });
}