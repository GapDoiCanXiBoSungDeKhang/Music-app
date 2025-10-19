const likeBtn = document.querySelector('.button-like');

if (likeBtn) {
    likeBtn.addEventListener('click', async () => {
        const span = likeBtn.querySelector('span');
        const getDataID = span.getAttribute('data-id');
        const isActive = likeBtn.classList.contains('active');
        const typeLike = isActive ? 'dislike' : 'like';
        const link = `/song/like/${typeLike}/${getDataID}`;

        try {
            const res = await fetch(link, {method: 'PATCH'});
            const data = await res.json();

            // Cập nhật số lượt thích
            span.innerHTML = `${data.likes} lượt thích`;

            // Toggle active class
            likeBtn.classList.toggle('active');

            // Trigger lại animation cho icon
            const icon = likeBtn.querySelector('i');
            icon.style.animation = 'none';
            icon.offsetHeight; // force reflow
            icon.style.animation = ''; // animation sẽ chạy lại
        } catch (err) {
            console.error('Lỗi khi like bài hát:', err);
        }
    });
}