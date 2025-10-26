document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.btn-icon.delete');
    const deleteForm = document.getElementById('singleDeleteForm');

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();

            const row = btn.closest('tr');
            const entity = btn.dataset.entity || 'item';
            const id = btn.dataset.id;

            // Lấy tiêu đề từ cột 4 (hoặc fallback)
            const titleCell = row.querySelector('td:nth-child(4)');
            const title = titleCell ? titleCell.innerText.trim() : entity;

            if (!id) {
                console.error('Không tìm thấy ID!');
                return;
            }

            const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa ${title}?`);
            if (confirmDelete) {
                // ✅ Tự động chọn route phù hợp
                deleteForm.action = `/server/delete/${entity}/${id}?_method=DELETE`;
                deleteForm.submit();
            }
        });
    });
});
