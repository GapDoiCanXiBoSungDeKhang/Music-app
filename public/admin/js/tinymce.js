tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'image link lists table code help wordcount',
    toolbar:
        'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code',
    menubar: false,
    height: 400,
    branding: false,

    // Cho phép chọn ảnh từ máy
    file_picker_types: 'image',
    automatic_uploads: true,

    // Không upload lên server, chỉ chèn base64
    images_upload_handler: function (blobInfo, success, failure) {
        // Chuyển file thành base64
        const base64 = blobInfo.base64();
        const mime = blobInfo.blob().type;
        success(`data:${mime};base64,${base64}`);
    },

    // Mở hộp thoại chọn file ảnh
    file_picker_callback: function (callback, value, meta) {
        if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = function () {
                const file = this.files[0];
                const reader = new FileReader();
                reader.onload = function () {
                    callback(reader.result, { alt: file.name });
                };
                reader.readAsDataURL(file);
            };
            input.click();
        }
    },
});
