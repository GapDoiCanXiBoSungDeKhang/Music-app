document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.btn-icon.delete');
    const deleteForm = document.getElementById('singleDeleteForm');

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();

            const songRow = btn.closest('tr');
            const title = songRow.querySelector('td:nth-child(4)')?.innerText.trim() || 'bài hát này';
            const songId = btn.dataset.id; // ✅ lấy từ data-id thay vì href

            if (!songId) {
                console.error('Không tìm thấy songId!');
                return;
            }

            const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa ${title}?`);
            if (confirmDelete) {
                deleteForm.action = `/server/song/${songId}?_method=DELETE`;
                deleteForm.submit();
            }
        });
    });
});
