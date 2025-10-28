// ===== Preview file image =====
const thumbnailInput = document.getElementById('thumbnailInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const removeImageBtn = document.getElementById('removeImageBtn');

thumbnailInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

removeImageBtn.addEventListener('click', () => {
    thumbnailInput.value = '';
    previewImage.src = '';
    previewContainer.style.display = 'none';
});

// ===== Preview file audio =====
const audioInput = document.getElementById('audioInput');
const audioPreviewContainer = document.getElementById('audioPreviewContainer');
const audioPreview = document.getElementById('audioPreview');
const audioRemoveBtn = document.getElementById('audioRemoveBtn');

audioInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            audioPreview.src = e.target.result;
            audioPreviewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

audioRemoveBtn.addEventListener('click', () => {
    audioInput.value = '';
    audioPreview.src = '';
    audioPreviewContainer.style.display = 'none';
});
