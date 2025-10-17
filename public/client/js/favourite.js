const btnFavourite = document.querySelectorAll('.button-favourite');

if (btnFavourite.length > 0) {
    btnFavourite.forEach(btnFavourite => {
        btnFavourite.addEventListener('click', async () => {
            const span = btnFavourite.querySelector('span');
            const getDataID = span.getAttribute('data-id');
            const isActive = btnFavourite.classList.contains('active');
            const typeFav = isActive ? 'disfav' : 'fav';
            const link = `/song/favourite/${typeFav}/${getDataID}`;

            try {
                fetch(link, { method: 'PATCH' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message !== 'success') return;
                        btnFavourite.classList.toggle('active');
                        const icon = btnFavourite.querySelector('i');
                        icon.style.animation = 'none';
                        icon.offsetHeight; // force reflow
                        icon.style.animation = ''; // animation sẽ chạy lại
                    });
            } catch (err) {
                console.error('Lỗi khi yêu thích bài hát:', err);
            }
        });
    });
}
