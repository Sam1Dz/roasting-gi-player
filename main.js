window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.getElementById('close-button');
    const form = document.getElementById('uid-form');
    const loadingScreen = document.getElementById('loading-screen');
    const UIDinput = document.getElementById('uid');

    modal.style.display = 'none';

    function hideModal() {
        modal.style.display = 'none';
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const uid = UIDinput.value;
        if (uid === '') {
            return;
        }
        getData(uid);
    });

    closeButton.addEventListener('click', hideModal);

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            hideModal();
        }
    });

    function getData(uid) {
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = `https://enka.network/api/uid/${uid}`;

        loadingScreen.style.display = 'flex';
        fetch(corsProxy + apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => parseData(data))
            .catch(error => {
                modal.style.display = 'block';
                loadingScreen.style.display = 'none';
                modalTitle.innerText = `Ada Masalah!`;
                modalMessage.innerText = `kayaknya API bang hoyoverse lagi rusak...`;
            });

        function parseData(data) {
            const { nickname, level, finishAchievementNum, towerFloorIndex, towerLevelIndex, showAvatarInfoList = [] } = data.playerInfo || {};

            let nicknameRoast = 'nickname lu gk ada kreatif" nya';
            if (isJapanese(nickname)) {
                nicknameRoast = 'lu wibu akut ya sampe username lu pake bahasa jepang';
            } else if (isChinese(nickname)) {
                nicknameRoast = 'lu chindo? gw gk bisa baca nickname lu apa';
            } else if (isNumber(nickname)) {
                nicknameRoast = 'lu kehabisan username ya sampe pake angka segala';
            }

            let levelRoast = ''
            if (level < 16) {
                levelRoast = `kasian bener lu masih level ${level}, gk bisa Co Op, mending lu main tiap hari biar naek level`
            } else if (level < 20) {
                levelRoast = `kasian lu level ${level} udah bisa Co Op tp lu gk punya teman buat maen`;
            } else if (level < 25) {
                levelRoast = `kasian lu level ${level} udah bisa Co Op tp lu gk punya teman buat maen`;
            } else if (level < 30) {
                levelRoast = `kasian lu level ${level} tp gk punya artefak bintang 5, mending lu kalahin weekly boss biar dapat banyak artefak bintang 5`;
            } else if (level < 35) {
                levelRoast = `kasian lu level ${level} tp gk punya artefak bintang 5, mending lu kalahin weekly boss biar dapat banyak artefak bintang 5`;
            } else if (level < 40) {
                levelRoast = `kasian lu level ${level} tp gk punya artefak bintang 5, mending lu kalahin weekly boss biar dapat banyak artefak bintang 5`;
            } else if (level < 45) {
                levelRoast = `kasian lu udah level ${level} tp artefak bintang 5 lu sedikit, mending lu farming normal bos biar banyak dapat artefak bintang 5`;
            } else if (level < 50) {
                levelRoast = `kasian lu udah level ${level} tp artefak bintang 5 lu sedikit, mending lu farming normal bos biar banyak dapat artefak bintang 5`;
            } else if (level < 55) {
                levelRoast = `kasian lu udah level ${level} tp gk punya meterial bintang 5, mending lu kalahin weekly bos biar dapat material bintang 5`;
            } else if (level < 60) {
                levelRoast = `kasian lu udah level ${level} tp meterial bintang 5 lu sedikit, mending lu farming normal bos biar banyak dapat banyak meterial bintang 5`;
            } else if (level == 60) {
                levelRoast = `level lu udah ${level}, udah mentok noh, mau cari apa lagi lu?`;
            }

            let avatarRoast = '';
            if (showAvatarInfoList.length) {
                avatarRoast = `level lu udah ${level} tapi karakter lu cuma ${showAvatarInfoList.length} karakter`;
            }
            const avartarCustomes = showAvatarInfoList.filter(({ costumeId }) => costumeId);
            if (avartarCustomes.length) {
                avatarRoast += `, lu orang kaya ya sampe top up beli ${avartarCustomes.length} kostum karater`
            }

            modalTitle.innerText = `Hai ${nickname}!`;
            modalMessage.innerText = `${nicknameRoast}. ${levelRoast}. ${avatarRoast}`;
            loadingScreen.style.display = 'none'
            modal.style.display = 'block';

        }
    }

    function isJapanese(text) {
        const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/;
        return japaneseRegex.test(text);
    }

    function isChinese(text) {
        const chineseRegex = /[\u4E00-\u9FFF]/;
        return chineseRegex.test(text);
    }

    function isNumber(text) {
        const numberRegex = /\d/;
        return numberRegex.test(text);
    }

});
