document.addEventListener('DOMContentLoaded', () => {
    const selectAllCheckbox = document.getElementById('selectAll');
    const songCheckboxes = document.querySelectorAll('.song-checkbox');

    // Khi click vào "Chọn tất cả"
    selectAllCheckbox.addEventListener('change', () => {
        songCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
    });

    // Khi click từng checkbox con
    songCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const allChecked = Array.from(songCheckboxes).every(c => c.checked);
            const noneChecked = Array.from(songCheckboxes).every(c => !c.checked);

            // Nếu tất cả chọn → checkbox "tất cả" cũng chọn
            // Nếu có ít nhất một bỏ chọn → bỏ chọn ô "tất cả"
            selectAllCheckbox.checked = allChecked;
            selectAllCheckbox.indeterminate = !allChecked && !noneChecked;
        });
    });
});

