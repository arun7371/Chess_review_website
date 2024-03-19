"use strict";
function loadSprite(filename) {
    return new Promise(res => {
        let image = new Image();
        image.src = "/static/media/" + filename;
        image.addEventListener("load", () => {
            res(image);
        });
    });
}
function loadSprite_piece(filename, themeOption) {
    return new Promise(res => {
        let image = new Image();
        image.src = `/static/media/chess_piece_assets/${themeOption}/` + filename;
        image.addEventListener("load", () => {
            res(image);
        });
    });
}
function updatePieces() {
    for (let [pieceId, pieceFenCharacter] of Object.entries(pieceIds)) {
        let pieceElements = document.getElementsByClassName(pieceFenCharacter);
        for (let i = 0; i < pieceElements.length; i++) {
            let pieceElement = pieceElements[i];
            pieceElement.src = pieceImages[pieceFenCharacter].src;
        }
    }
}
const pieceIds = {
    "wP": "P",
    "wN": "N",
    "wB": "B",
    "wR": "R",
    "wQ": "Q",
    "wK": "K",
    "bP": "p",
    "bN": "n",
    "bB": "b",
    "bR": "r",
    "bQ": "q",
    "bK": "k"
};
let pieceImages = {};
let pieceLoaders = [];
function loadPieces(themeOption) {
    pieceImages = {};
    pieceLoaders = [];
    for (let [pieceId, pieceFenCharacter] of Object.entries(pieceIds)) {
        let pieceLoader = loadSprite_piece(pieceId + ".svg", themeOption);
        pieceLoader.then(image => {
            pieceImages[pieceFenCharacter] = image;
        });
        pieceLoaders.push(pieceLoader);
    }
    return Promise.all(pieceLoaders).then(() => { });
}
let themeOptionElement = document.getElementById('themeOption');
if (themeOptionElement) {
    let themeOption = themeOptionElement.value;
    loadPieces(themeOption).then(() => {
        var _a, _b;
        updatePieces();
        drawBoard((_b = (_a = reportResults === null || reportResults === void 0 ? void 0 : reportResults.positions[currentMoveIndex]) === null || _a === void 0 ? void 0 : _a.fen) !== null && _b !== void 0 ? _b : startingPositionFen);
        window.requestAnimationFrame(() => { });
    });
    themeOptionElement.addEventListener('change', function () {
        themeOption = this.value;
        loadPieces(themeOption).then(() => {
            var _a, _b;
            updatePieces();
            drawBoard((_b = (_a = reportResults === null || reportResults === void 0 ? void 0 : reportResults.positions[currentMoveIndex]) === null || _a === void 0 ? void 0 : _a.fen) !== null && _b !== void 0 ? _b : startingPositionFen);
            window.requestAnimationFrame(() => { });
        });
    });
}
const classificationIcons = {
    "brilliant": null,
    "great": null,
    "best": null,
    "excellent": null,
    "good": null,
    "inaccuracy": null,
    "mistake": null,
    "miss": null,
    "blunder": null,
    "forced": null,
    "book": null
};
for (let classification in classificationIcons) {
    loadSprite(classification + ".png").then(image => {
        classificationIcons[classification] = image;
    });
}
