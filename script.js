const values = [1.071000, 0.938700, 2.453000, 2.793000, 3.283000, 4.319000, 4.699000];
const output = document.querySelector("#output");
const total = values.reduce((sum, value) => sum + value);

document.querySelectorAll("#bars line").forEach((bar, i) => {
    bar.setAttribute("y1", 100 - values[i] * 20);
    bar.setAttribute("data-value", values[i]);
    bar.setAttribute("data-procent", values[i] / total * 100);
    bar.addEventListener("mouseover", e => vis(e));
    bar.addEventListener("mouseout", skjul);
});

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


for (let step = 0; step < 1; step++) {
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
}

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
