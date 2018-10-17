class Game {
    constructor(rows, cols, mines, container) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.container = container;
        this.generateMap();
        this.redraw();
    }

    generateMap() {
        this.map = [];
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            this.map.push(row);
            for (let j = 0; j < this.cols; j++) {
                let ceil = new Ceil();
                row.push(ceil);
            }
        }
    }

    redraw() {
        this.container.textContent = '';//czyścimy
        for (let row of this.map) {
            let rowHtml = document.createElement('div');
            rowHtml.className = 'row';
            this.container.appendChild(rowHtml);
            for (let cell of row) {
                let cellHtml = document.createElement('div');
                cellHtml.className = 'cell';
                cellHtml.dataset.status = cell.status;
                rowHtml.appendChild(cellHtml);
            }
        }
    }
}

class Ceil {
    constructor() {
        this.hasBomb = false;
        this.status = 'default';
    }
}

document.querySelectorAll('.startGame').forEach(x => x.onclick = function () {
    window.currentGame = new Game(this.dataset.rows, this.dataset.cols, this.dataset.mines, document.querySelector('.game'));
});