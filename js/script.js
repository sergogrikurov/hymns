const inputNum = document.querySelector(".inputNum");
const inputText = document.querySelector(".inputText");
const iBtn = document.querySelector(".i-btn");
const hCont = document.querySelector(".hymn-container");
const hymnNum = document.querySelector(".hymnNum");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const main = document.querySelector(".main");
const playStop = document.querySelector(".play-stop");
const play = document.querySelector(".play");
const stopP = document.querySelector(".stop");
const pause = document.querySelector(".pause");
const search = document.querySelector(".search");
const hymnWrapper = document.querySelector(".hymn-wrapper");
const strContainer = document.querySelector(".str-container");
const hymnHistory = document.querySelector(".hymn-history");
const historyBtn = document.querySelector(".history-btn");
const heartBtn = document.querySelector(".heart-btn");
const heartHymn = document.querySelector(".heart-hymn");
const historyList = document.querySelector(".historyList");
const favoriteList = document.querySelector(".favoriteList");
const hymnFavorite = document.querySelector(".hymn-favorite");

//=======================================================//

let favoriteItems = JSON.parse(localStorage.getItem("favorite_items")) || [];
let historyItems = JSON.parse(localStorage.getItem("history_items")) || [];

//=======================================================//

inputNum.addEventListener("click", () => (inputText.value = ""));
inputText.addEventListener("click", () => (inputNum.value = ""));

//=======================================================//

let song = new Audio();

function songSrc() {
  const gStr = document.querySelector(".hNum").textContent;
  let hNum = Number(gStr);
  song.src = `./audio/${hNum}.ogg`;
}

//=======================================================//

inputNum.oninput = function () {
  if (this.value.length > this.maxLength) {
    this.value = this.value.slice(0, this.maxLength);
  }
};

//=======================================================//

inputNum.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/^0/, "");
  if (e.target.value > 800) {
    e.target.value = "";
  }
});

inputText.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^а-яё\s]/gi, "");
});

//=======================================================//

let sum = 0;

iBtn.addEventListener("click", () => {
  const data = inputNum.value;
  if (data !== "") {
    main.classList.add("none");
    hymnWrapper.classList.remove("none");
    prev.classList.remove("hide");
    next.classList.remove("hide");
    stopP.classList.add("none");
    pause.classList.add("none");
    play.classList.remove("none");
    playStop.classList.remove("none");
    sum = data - 1;
    hCont.innerHTML = `${pages[sum].page}`;
    hNumber();

    songSrc();
    let hnst = document.querySelector(".hymnNum span").textContent;
    let hNs = Number(hnst);
    if (hNs === 1) {
      prev.classList.add("hide");
    }
    if (hNs === 800) {
      next.classList.add("hide");
    }
  }
});

//=======================================================//

const inputTextModal = document.querySelector(".inputText__modal");

iBtn.addEventListener("click", () => {
  const dadaText = inputText.value.trim();
  if (dadaText !== "" && dadaText.length < 8) {
    inputTextModal.classList.remove("height-none");
    inputNum.addEventListener("click", () => {
      inputTextModal.classList.add("height-none");
    });
    inputText.addEventListener("click", () => {
      inputTextModal.classList.add("height-none");
    });
    historyBtn.addEventListener("click", () => {
      inputTextModal.classList.add("height-none");
      if (historyList.childNodes.length === 0) {
        inputText.focus();
      }
    });
  }
  for (let key in pages) {
    if (
      pages[key].page.includes(dadaText) &&
      dadaText !== "" &&
      dadaText.length > 7
    ) {
      main.classList.add("none");
      strContainer.classList.remove("none");
      let str = pages[key].title;
      let num = pages[key].num;
      strContainer.innerHTML += `<li class="str-li" data="${key}">${str}<span>${num}</span></li>`;
    }
  }
  document.querySelectorAll(".str-li").forEach((item) => {
    item.onclick = function () {
      strContainer.classList.add("none");
      hymnWrapper.classList.remove("none");
      stopP.classList.add("none");
      pause.classList.add("none");
      play.classList.remove("none");
      playStop.classList.remove("none");
      strContainer.innerHTML = "";
      let s = this.getAttribute("data");
      let n = Number(s);
      hCont.innerHTML = `${pages[n].page}`;
      hNumber();

      songSrc();
      sum = n;
      let hnst = document.querySelector(".hymnNum span").textContent;
      let hNs = Number(hnst);
      if (hNs === 1) {
        prev.classList.add("hide");
        next.classList.remove("hide");
      }
      if (hNs === 800) {
        next.classList.add("hide");
        prev.classList.remove("hide");
      }
      if (hNs > 1 && hNs < 800) {
        next.classList.remove("hide");
        prev.classList.remove("hide");
      }
    };
  });
});

//=======================================================//

prev.onclick = function () {
  next.classList.remove("hide");
  hCont.innerHTML = `${pages[sum - 1].page}`;
  stopP.classList.add("none");
  pause.classList.add("none");
  play.classList.remove("none");
  playStop.classList.remove("none");
  hNumber();
  songSrc();
  sum--;
  let hnst = document.querySelector(".hymnNum span").textContent;
  let hNs = Number(hnst);
  if (hNs === 1) {
    prev.classList.add("hide");
  }
};

//=======================================================//

next.onclick = function () {
  prev.classList.remove("hide");
  sum++;
  hCont.innerHTML = `${pages[sum].page}`;
  stopP.classList.add("none");
  pause.classList.add("none");
  play.classList.remove("none");
  playStop.classList.remove("none");
  hNumber();
  songSrc();
  let hnst = document.querySelector(".hymnNum span").textContent;
  let hNs = Number(hnst);
  if (hNs === 800) {
    next.classList.add("hide");
  }
};

//=======================================================//

stopP.classList.add("none");
pause.classList.add("none");

function playSound() {
  song.play();
}

function stopSound() {
  song.pause();
  song.currentTime = 0;
}

function pauseSound() {
  song.pause();
}

//=======================================================//

play.onclick = function () {
  this.classList.add("none");
  stopP.classList.remove("none");
  pause.classList.remove("none");
  playSound();
};

stopP.onclick = stopF;
function stopF() {
  stopP.classList.add("none");
  pause.classList.add("none");
  play.classList.remove("none");
  playStop.classList.remove("none");
  stopSound();
}

pause.onclick = function () {
  pauseSound();
  this.classList.add("none");
  stopP.classList.remove("none");
  play.classList.remove("none");
  playStop.classList.remove("none");
};

song.addEventListener("ended", () => {
  stopF();
  addItem();
});

//=======================================================//

search.onclick = () => {
  hymnWrapper.classList.add("none");
  main.classList.remove("none");
  hymnHistory.classList.add("none");
  historyBtn.classList.remove("active");
  stopSound();
  inputNum.value = "";
  inputText.value = "";
};

//=======================================================//

function hNumber() {
  const hNum = document.querySelector(".hNum");
  hymnNum.innerHTML = `Гимн <span>${hNum.textContent}</span>`;

  checkFavorite();
}

//=======================================================//

function checkFavorite() {
  const hNum = Number(document.querySelector(".hymnNum span").textContent);

  if (favoriteItems.includes(hNum)) {
    heartHymn.classList.add("active");
  } else {
    heartHymn.classList.remove("active");
  }
}

//=======================================================//

function toggleFavorite() {
  const hNum = Number(document.querySelector(".hymnNum span").textContent);

  if (favoriteItems.includes(hNum)) {
    favoriteItems = favoriteItems.filter((item) => item !== hNum);
  } else {
    favoriteItems.push(hNum);
  }

  localStorage.setItem("favorite_items", JSON.stringify(favoriteItems));

  checkFavorite();
  displayFavorites();
}

//=======================================================//

if (heartHymn) {
  heartHymn.onclick = toggleFavorite;
}

//=======================================================//

heartBtn.onclick = function () {
  if (favoriteItems.length !== 0) {
    displayFavorites();

    main.classList.add("none");
    hymnFavorite.classList.remove("none");
  }
};

//=======================================================//

function addItem() {
  const hStr = document.querySelector(".hymnNum span").textContent;
  let n = Number(hStr);

  function strCreate() {
    for (let key in pages) {
      let str = pages[n - 1].title;
      let num = pages[n - 1].num;

      historyItems.push(
        `<li class="h-str-li" data="${num}">${str}<span>${num}</span></li>`,
      );

      break;
    }
  }

  if (localStorage.getItem("history_items")) {
    historyItems = JSON.parse(localStorage.getItem("history_items"));

    strCreate();

    const arr = [...new Set(historyItems)];

    if (arr.length > 20) {
      arr.shift();
      historyItems = [];
      localStorage.setItem("history_items", JSON.stringify(arr));
    } else {
      historyItems = [];
      localStorage.setItem("history_items", JSON.stringify(arr));
    }
  } else {
    strCreate();

    const arr = [...new Set(historyItems)];

    historyItems = [];

    localStorage.setItem("history_items", JSON.stringify(arr));
  }

  displayHistoryItems();
}

//=======================================================//

function displayHistoryItems() {
  let historyStr = JSON.parse(localStorage.getItem("history_items"));
  let out = "";
  if (historyStr !== null) {
    for (let i = historyStr.length; i >= 0; i--) {
      if (historyStr[i] !== undefined) {
        out += `${historyStr[i]}`;
      }
    }
  }
  historyList.innerHTML = out;
}
displayHistoryItems();

//=======================================================//

function displayFavorites() {
  let out = "";

  favoriteItems.forEach((item) => {
    let index = item - 1;

    if (!pages[index]) return;

    let title = pages[index].title;
    let num = pages[index].num;

    out += `
      <li class="h-str-li" data-num="${num}">
        ${title}
        <span>${num}</span>
      </li>
    `;
  });

  favoriteList.innerHTML = out;

  document.querySelectorAll(".favoriteList .h-str-li").forEach((item) => {
    item.onclick = function () {
      let n = Number(this.dataset.num) - 1;

      hymnFavorite.classList.add("none");
      hymnWrapper.classList.remove("none");

      stopP.classList.add("none");
      pause.classList.add("none");
      play.classList.remove("none");

      hCont.innerHTML = `${pages[n].page}`;

      hNumber();

      songSrc();

      sum = n;
    };
  });
}

//=======================================================//

historyBtn.onclick = function () {
  if (historyList.childNodes.length != 0) {
    this.classList.add("active");
    if (this.classList.contains("active")) {
      hymnHistory.classList.remove("none");
      main.classList.add("none");
    }
    document.querySelectorAll(".h-str-li").forEach((item) => {
      item.onclick = function () {
        hymnHistory.classList.add("none");
        main.classList.add("none");
        hymnWrapper.classList.remove("none");
        stopP.classList.add("none");
        pause.classList.add("none");
        play.classList.remove("none");
        playStop.classList.remove("none");
        strContainer.innerHTML = "";
        let s = this.getAttribute("data");
        let n = Number(s);
        n = n - 1;
        hCont.innerHTML = `${pages[n].page}`;
        hNumber();

        songSrc();
        sum = n;
        let hnst = document.querySelector(".hymnNum span").textContent;
        let hNs = Number(hnst);
        if (hNs === 1) {
          prev.classList.add("hide");
          next.classList.remove("hide");
        }
        if (hNs === 800) {
          next.classList.add("hide");
          prev.classList.remove("hide");
        }
        if (hNs > 1 && hNs < 800) {
          next.classList.remove("hide");
          prev.classList.remove("hide");
        }
      };
    });
  }
};
