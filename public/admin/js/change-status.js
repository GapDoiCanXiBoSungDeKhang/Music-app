document.addEventListener('DOMContentLoaded', () => {
    const statusBadges = document.querySelectorAll('.status-toggle');

    statusBadges.forEach(badge => {
        badge.addEventListener('click', async () => {
            const id = badge.dataset.id;
            const currentStatus = badge.dataset.status;
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

            // Hỏi xác nhận trước khi đổi
            const confirmChange = confirm(
                `Bạn có chắc muốn đổi trạng thái bài hát này sang "${newStatus}" không?`
            );
            if (!confirmChange) return;

            try {
                const res = await fetch(`/server/song/change-status/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: newStatus })
                });

                if (res.ok) {
                    // Cập nhật ngay trên giao diện
                    badge.textContent = newStatus === 'active' ? 'Active' : 'Inactive';
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
