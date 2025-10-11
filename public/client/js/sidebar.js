/**
 * Sidebar Toggle Handler
 * -----------------------
 * - Overlay sidebar (ẩn mặc định), có backdrop
 * - Nút hamburger luôn hiển thị (mọi kích thước)
 * - Hỗ trợ: click backdrop, phím Escape để đóng
 * - Thêm/rem class "sidebar-open" trên body để CSS có thể tùy chỉnh (ví dụ mờ content)
 */
function initSidebarToggle() {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleSidebar");
    if (!sidebar || !toggleBtn) return;

    // tạo backdrop nếu chưa có
    let backdrop = document.getElementById("sidebar-backdrop");
    if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.id = "sidebar-backdrop";
        document.body.appendChild(backdrop);
    }

    const openSidebar = () => {
        sidebar.classList.add("show");
        backdrop.classList.add("active");
        document.body.classList.add("sidebar-open");
        toggleBtn.setAttribute("aria-expanded", "true");
    };

    const closeSidebar = () => {
        sidebar.classList.remove("show");
        backdrop.classList.remove("active");
        document.body.classList.remove("sidebar-open");
        toggleBtn.setAttribute("aria-expanded", "false");
    };

    toggleBtn.addEventListener("click", () => {
        if (sidebar.classList.contains("show")) closeSidebar();
        else openSidebar();
    });

    backdrop.addEventListener("click", closeSidebar);

    // Close on ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSidebar();
    });
}

document.addEventListener("DOMContentLoaded", initSidebarToggle);