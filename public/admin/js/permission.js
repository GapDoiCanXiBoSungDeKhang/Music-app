document.addEventListener('DOMContentLoaded', () => {
    const btnSave = document.getElementById('btnSave');
    const form = document.getElementById('permissionForm');
    const hiddenInput = document.getElementById('permissionsData');

    btnSave.addEventListener('click', (e) => {
        e.preventDefault();

        const checkboxes = document.querySelectorAll('.permission-checkbox');
        const permissionsByRole = {};

        // Duyệt qua tất cả checkbox
        checkboxes.forEach(cb => {
            const match = cb.name.match(/^perm_(.+?)_(.+)$/); // Ví dụ: perm_123456_product_view
            if (!match) return;

            const roleId = match[1];
            const permKey = match[2];

            if (!permissionsByRole[roleId]) {
                permissionsByRole[roleId] = [];
            }

            if (cb.checked) {
                permissionsByRole[roleId].push(permKey);
            }
        });

        // Gom lại thành mảng gửi đi
        const result = Object.keys(permissionsByRole).map(roleId => ({
            role_id: roleId,
            permissions: permissionsByRole[roleId],
        }));

        // Gắn dữ liệu JSON vào input hidden
        hiddenInput.value = JSON.stringify(result);

        // Submit form
        form.submit();
    });
});
