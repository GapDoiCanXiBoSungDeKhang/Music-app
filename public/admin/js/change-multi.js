document.addEventListener('DOMContentLoaded', () => {
    const actionSelects = document.querySelectorAll('.filter-action');
    const checkboxes = document.querySelectorAll('.song-checkbox');
    const form = document.getElementById('multiActionForm');
    const inputIds = document.getElementById('selectedIds');
    const inputAction = document.getElementById('selectedAction');

    actionSelects.forEach(select => {
        select.addEventListener('change', () => {
            const selectedValue = select.value;
            const selectedIds = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            if (selectedValue === 'delete') {
                if (selectedIds.length === 0) {
                    alert('Vui lòng chọn ít nhất một bài hát để xóa.');
                    select.value = 'all';
                    return;
                }

                const confirmDelete = confirm('Bạn có chắc chắn muốn xóa những bài hát đã chọn không?');
                if (!confirmDelete) {
                    select.value = 'all';
                    return;
                }
            }

            // Gán dữ liệu vào form ẩn
            inputIds.value = JSON.stringify(selectedIds);
            inputAction.value = selectedValue;

            // Gửi form PATCH
            form.submit();
        });
    });
});
