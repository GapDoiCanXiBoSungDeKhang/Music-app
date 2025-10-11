const getId = document.getElementById('aplayer');

if (getId) {
    const getDataId = JSON.parse(getId.getAttribute('data'));
    const ap = new APlayer({
        container: getId,
        autoplay: true,
        fixed: false,
        mini: false,
        audio: [{
            name: getDataId.title,
            artist: getDataId.singerId.fullName,
            url: getDataId.audio,
            cover: getDataId.avatar,
        }]
    });

    const avatar = document.querySelector('.cover');
    ap.on('play', () => {
        avatar.style.animationPlayState = 'running';
    });

    ap.on('pause', () => {
        avatar.style.animationPlayState = 'paused';
    });
}