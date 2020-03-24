const values = [1.071000, 0.938700, 2.453000, 2.793000, 3.283000, 4.319000, 4.699000];
const output = document.querySelector("#output");
const total = values.reduce((sum, value) => sum + value);

//Burgermenu Below
document.querySelector("#menuknap").addEventListener("click", toggleMenu);
document.querySelector("ul").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector("#menu").classList.toggle("hidden");
    let erSkjult = document.querySelector("#menu").classList.contains("hidden");
    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
    } else {
        document.querySelector("#menuknap").textContent = "X";
    }
}

//Graph Below
document.querySelectorAll("#bars line").forEach((bar, i) => {
    bar.setAttribute("y1", 100 - values[i] * 20);
    bar.setAttribute("data-value", values[i]);
    bar.setAttribute("data-procent", values[i] / total * 100);
    bar.addEventListener("mouseover", e => vis(e));
    bar.addEventListener("mouseout", skjul);
});

setInterval(function () {
    console.log(window.pageYOffset);
    if (window.pageYOffset > 575) {
        console.log("show_graph");
        document.querySelector("#barchart").classList.remove("hide");
        document.querySelector("#barchart").classList.add("show_graph");
        document.querySelector("#bars").classList.add("show_pillars");
        document.querySelector("#bars").classList.remove("hide");
    }
}, 1000);

function vis(e) {
    console.log(e.target);

    let tal = e.target.dataset.value * 1000000;
    let talString = tal.toString();
    let punktum = ".";
    let nul = "0";

    let pos0 = 0;
    let pos1 = 1;
    let pos2 = 4;
    let pos3 = 3;
    let fullNumber = [talString.slice(0, pos1), punktum, talString.slice(0, pos2), punktum, talString.slice(pos2), ].join('');
    console.log(fullNumber);


    output.textContent = fullNumber + " liter";
    output.style.display = "block";
    window.addEventListener("mousemove", followMouse);

    if (talString.length < 7) {
        let belowMillion = [talString.slice(0, pos3), punktum, talString.slice(pos3)].join('');
        output.textContent = belowMillion + " liter";
    }
}

function followMouse(e) {
    output.style.top = (e.clientY + 895) + 'px';
    output.style.left = (e.clientX) + 'px';
}

function skjul() {
    output.style.display = "none";
    window.removeEventListener("mousemove", followMouse);
}


//Game Below
document.querySelector("#play_button").addEventListener("click", startGame);
let cans = document.querySelectorAll(".can_container");
let score = 0;
let scoreLeft = 5;

function startGame() {
    document.querySelector("#play_button").removeEventListener("click", startGame);
    document.querySelector("#play_button").textContent = scoreLeft + " dåser tilbage";

    document.querySelector("#play_button").style.width = "170px";
    document.querySelector("#play_button").style.cursor = "default";
    document.querySelector("#play_button").style.position = "fixed";
    document.querySelector("#play_button").style.left = "0";
    document.querySelector("#play_button").style.top = "10vh";

    cans.forEach(can => {
        can.addEventListener("click", canClick);
        can.classList.remove("hide");
        can.classList.add("can_ani");
    });
}

function canClick() {
    this.classList.add("hide");
    score++;
    document.querySelector("#play_button").textContent = (scoreLeft - score) + " dåser tilbage";
    if (score == 5) {
        console.log("u win");
        winning();
    }

    if (score == 4) {
        document.querySelector("#play_button").textContent = (scoreLeft - score) + " dåse tilbage";
    }
}

function winning() {
    document.querySelector("#play_button").style.width = "40%";
    document.querySelector("#play_button").style.position = "relative";
    document.querySelector("#play_button").style.left = "0";
    document.querySelector("#play_button").style.top = "0";

    document.querySelector("#win").style.display = "flex";

    document.querySelector("#send").addEventListener("click", closeWin);
    document.querySelector("#close").addEventListener("click", closeWin);
}

function closeWin() {
    document.querySelector("#win").style.display = "none";
}
