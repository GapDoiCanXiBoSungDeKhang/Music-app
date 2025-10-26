document.addEventListener('DOMContentLoaded', () => {
    const statusBadges = document.querySelectorAll('.status-toggle');

    statusBadges.forEach(badge => {
        badge.addEventListener('click', async () => {
            const id = badge.dataset.id;
            const currentStatus = badge.dataset.status;
            const entity = badge.dataset.entity || 'item';
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

            const confirmChange = confirm(
                `Bạn có chắc muốn đổi trạng thái ${entity} này sang "${newStatus}" không?`
            );
            if (!confirmChange) return;

            try {
                const res = await fetch(`/server/${entity}/change-status/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: newStatus })
                });

                if (res.ok) {
                    badge.textContent = newStatus === 'active' ? 'hoạt động' : 'ngưng hoạt động';
                    badge.dataset.status = newStatus;
                    badge.classList.toggle('bg-success', newStatus === 'active');
                    badge.classList.toggle('bg-secondary', newStatus === 'inactive');
                } else {
                    alert('Không thể đổi trạng thái. Vui lòng thử lại.');
                }
            } catch (err) {
                console.error(err);
                alert('Lỗi khi đổi trạng thái.');
            }
        });
    });
});
