// api tmdb
const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
let API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

// all geners
const categaery = [
    {
        "id": null,
        "name": "All"
    },
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]


// constant virables
const articalContainer = document.querySelector('.container')
const moveContainer = document.querySelector('.oneMoveContainer')
const moveInOnePage = null;
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const count = document.getElementById('count')
const search = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn');
const filterBtn = document.getElementById('filterBtn');
const option = document.getElementById('option')
const genrs = document.getElementById('categaryContainer');
// but  geners in doc 
categaery.forEach((type) => {
    genrs.innerHTML += `<li value="${type.name}">${type.name}</li>`
});
// virable
let closeBtn;
let pageNumber = 1;
let result;

// add event on elements
// get next page
next.addEventListener('click', () => {
    pageNumber++
    prev.style.opacity = '1'
    if (pageNumber == 20) {
        pageNumber = 1
    } else {
        count.innerHTML = pageNumber;
        getSecondPage(pageNumber)
    }
});
// get prev page
prev.addEventListener('click', (e) => {
    if (pageNumber == 1) {
        prev.style.opacity = '0.5'
        getSecondPage(pageNumber)
        e.preventDefault();
    } else {
        pageNumber--;
        count.innerHTML = pageNumber;
        getSecondPage(pageNumber)
    }
});
// show the move info
articalContainer.addEventListener('click', e => {

    if (e.target.tagName == 'IMG') {
        getApiInfo(API_URL, moveInfo, e.path[2].dataset.index)
    };

});
// search on move
searchBtn.addEventListener('click', () => {
    if (search.value === '') {
        articalContainer.innerHTML = ''
        API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
        getApiInfo(API_URL, showMove)
    } else {
        articalContainer.innerHTML = ''
        API_URL = searchURL + '&query=' + search.value
        search.value = ''
        getApiInfo(API_URL, showMove)
    };
});
// show all options
filterBtn.addEventListener('click', () => {
    // option.style.height = '200px'
    option.classList.toggle('showFilterOption')
});
// chose option
genrs.addEventListener('click', (e) => {
    if (e.target.textContent === 'All') {
        API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
        articalContainer.innerHTML = '';
        filterBtn.textContent = e.target.textContent;
        option.classList.remove('showFilterOption')
        getApiInfo(API_URL, showMove)

    } else {
        API_URL = geners(e.target.textContent);
        articalContainer.innerHTML = '';
        filterBtn.textContent = e.target.textContent;
        option.classList.remove('showFilterOption')
        getApiInfo(API_URL, showMove)
    }
});

getApiInfo(API_URL, showMove)

function getApiInfo(url, func, index = 'null') {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            func(data, index)
        })
};

function showMove(data) {
    let count = 0;
    let allMoveis = data.results
    // console.log(data);
    if (allMoveis == undefined) {
        alert('check the internet connected')
        console.log('wait');
    }
    else {
        //add the  moveis in container
        allMoveis.forEach(move => {
            articalContainer.innerHTML +=
                `
            <article data-index="${count}">
                <figure class="move-img">
                    <img src="${IMG_URL + move.poster_path}" alt="poster of move">
                    <figcaption class="move-name">
                        ${move.original_title}
                    </figcaption>
                </figure>
                <section class="move-detils">
                    <ul>
                        <li class="voit" >vote: <strong class="${vote(move.vote_average)}">${move.vote_average}</strong></li>
                        <li class="viwers">Views: ${move.popularity}</li>
                    </ul>
                </section>
            </article>
                `;
            count++;
        });
    };
};

function moveInfo(info, index) {
    let moveis = info.results;
    let theMoveInfo = moveis[index];
    console.log(moveis);
    getApiInfo(BASE_URL + '/movie/' + info.results[index].id + '/videos?' + API_KEY, youtube, index)

    console.log(info);
    moveContainer.innerHTML =
        `
        <section class="one-move">
        <button class="close-move-btn" id="closeMoveBtn">close</button>
            <article>
                <figure>
                    <img src="${IMG_URL + theMoveInfo.poster_path}" alt="film poster">
                </figure>
                <section class="move-info">
                    <figcaption>
                            ${theMoveInfo.original_title}
                    </figcaption>
                    <ul>
                        <li class="voit">voit: ${theMoveInfo.vote_average}</li>
                        <li class="viwers">view: ${theMoveInfo.popularity}</li>
                        <li class="data">data: ${theMoveInfo.release_date}</li>
                    </ul>
                </section>
            </article>
            <h4>overview : </h4>
            <p class="move-overView">
                ${theMoveInfo.overview}
            </p>
            <section class="youtube-video"></section
        </section>
        `

    closeBtn = document.querySelector('.close-move-btn').addEventListener('click', closeMove)
    // remove hide class from container
    moveContainer.classList.remove('hide')
};

function youtube(video = null, index = null) {
    // console.log('video youtube');
    // console.log(video);
    let videoContainer = document.querySelector('.youtube-video');

    let youtubeVideo = `<iframe height="auto" width="100%" src="https://www.youtube.com/embed/${video.results[0].key}">`
    videoContainer.innerHTML = youtubeVideo;
};

function getSecondPage(number) {
    // split the api link
    let urlSplit = API_URL.split('?'); //api_url  == lastUrl
    // console.log(urlSplit);

    let queryParams = urlSplit[1].split('&');
    // console.log(queryParams);

    let key = queryParams[queryParams.length - 1].split('=');
    // console.log(key);

    API_URL = API_URL + '&page=' + number
    // console.log(url);
    // getMovies(url)

    articalContainer.innerHTML = ''
    getApiInfo(API_URL, showMove)
};

function closeMove() {
    moveContainer.classList.add('hide');
    moveContainer.innerHTML = ''
};

function geners(type) {
    let id;
    for (let gener of categaery) {

        if (gener.name == type) {
            id = gener.id

            return API_URL + '&with_genres=' + id;
        }

    }

};

function vote(number) {
    if (number <= 5) {
        return 'red';
    }
    if (number > 5 && number <= 7) {
        return 'yallow';
    }
    if (number > 7) {
        return 'green';
    }
}
