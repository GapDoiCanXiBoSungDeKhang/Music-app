const formSearch = document.getElementById('searchForm');
if (formSearch) {
    const inputSearch = formSearch.querySelector("input[name='q']");
    const boxSuggest = formSearch.querySelector('.inner-suggest');

    inputSearch.addEventListener("keyup", async () => {
        const value = inputSearch.value;
        const link = `/song/search/suggest?q=${value}`;
        const res = await fetch(link);
        const data = await res.json();
        const songs = data.songs;

        if (songs.length > 0) {
            boxSuggest.classList.add('show');
            const htmls = songs.map(song => {
                return `
                    <a class="inner-item" href="/song/detail/${song.slug}">
                        <div class="inner-image"><img src="${song.avatar}"/></div>
                        <div class="inner-info">
                            <div class="inner-title">${song.title}</div>
                            <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i>${song.singerId.fullName}</div>
                        </div></a>
                `;
            });
            const boxList = boxSuggest.querySelector('.inner-list');
            boxList.innerHTML = htmls.join('');
        } else {
            boxSuggest.classList.remove('show');
        }
    });
}