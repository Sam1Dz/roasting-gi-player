window.addEventListener('DOMContentLoaded', () => {
    const maxx = document.body.clientWidth;
    const maxy = document.body.clientHeight;
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = maxx;
    canvas.height = maxy;
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.getElementById('close-button');
    const form = document.getElementById('uid-form');
    const loadingScreen = document.getElementById('loading-screen');
    const UIDinput = document.getElementById('uid');
    const uidAlert = document.getElementById('uidAlert'); 

    modal.style.display = 'none';

    function hideModal() {
        modal.style.display = 'none';
    }

    UIDinput.addEventListener('focus', () => {
        uidAlert.style.visibility = 'hidden';
    })

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const uid = UIDinput.value.trim();
        const filteredInput = uid.replace(/\D/g, ''); 
        if (uid === '') {
            uidAlert.textContent = 'UID tidak boleh kosong';
            uidAlert.style.visibility = 'visible';
            return;
        } else if (uid !== filteredInput) {
            uidAlert.textContent = 'UID hanya bisa diisi angka';
            uidAlert.style.visibility = 'visible';
            return;
        } else if(uid.length < 9) {
            uidAlert.textContent = 'UID harus 9 karakter';
            uidAlert.style.visibility = 'visible';
            return;
        } else if(uid.length > 9) {
            uidAlert.textContent = 'UID hanya 9 karakter';
            uidAlert.style.visibility = 'visible';
            return;
        }
        uidAlert.style.visibility = 'hidden';
        getData(uid);
    });

    closeButton.addEventListener('click', hideModal);

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            hideModal();
        }
    });

    function getSession(uid) {
        const cacheKey = `enka_data_${uid}`;
        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        return null;
    }

    function setSession(uid, data) {
        const cacheKey = `enka_data_${uid}`;
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
    }

    async function getData(uid) {
        const apiUrl = `/api/uid/${uid}`;

        loadingScreen.style.display = 'flex';
        try {
            let data = getSession(uid)
            if (!data) {
                const response = await fetch(apiUrl);
                data = await response.json();
                if (response.status == 404) {
                    modalTitle.innerText = `UID tidak ditemukan!`;
                    modalMessage.innerText = `coba pake uid lain lagi ngab ...`;
                    data = null;
                }
                if (response.status == 500) {
                    modalTitle.innerText = `Ada Masalah!`;
                    modalMessage.innerText = `kayaknya API bang hoyoverse lagi rusak...`;
                    data = null;
                }
            }
            if(data) parseData(data);
            setSession(uid, data);
        } catch (error) {
            console.log(error);
            
            modalTitle.innerText = `Ada Masalah!`;
            modalMessage.innerText = `kayaknya API bang hoyoverse lagi rusak...`;
        } finally {
            modal.style.display = 'block';
            loadingScreen.style.display = 'none';
        }

        function parseData(data) {
            const { username, showcase = [] , levels = {} } = data.player || {};
            const level = levels.rank;
            const showAvatarInfoList = showcase;

            let nicknameRoast = 'username lu gk ada kreatif" nya';
            if (isJapanese(username)) {
                nicknameRoast = 'lu wibu akut ya sampe username lu pake bahasa jepang';
            } else if (isChinese(username)) {
                nicknameRoast = 'lu chindo? gw gk bisa baca username lu apa';
            } else if (isNumber(username)) {
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
                avatarRoast += `, lu pasti orang kaya ya sampe top up beli ${avartarCustomes.length} kostum karakter`
            }

            modalTitle.innerText = `Hai ${username}!`;
            modalMessage.innerText = `${nicknameRoast}. ${levelRoast}. ${avatarRoast}`;
            loadingScreen.style.display = 'none'
            modal.style.display = 'block';

        }
    }

    function isJapanese(text) {
        const japaneseRegex =  /[\u3040-\u309F\u30A0-\u30FF]/;
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