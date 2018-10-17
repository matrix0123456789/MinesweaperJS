class Game {
    constructor(rows, cols, mines, container) {
        this.isActive = true;
        container.classList.remove('gameover');
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
                let ceil = new Ceil(i, j);
                row.push(ceil);
            }
        }
        let remainingBombs = this.mines;
        while (remainingBombs > 0) {
            let row = Math.floor(Math.random() * this.rows);
            let col = Math.floor(Math.random() * this.cols);
            if (!this.map[row][col].hasBomb) {
                this.map[row][col].hasBomb = true;
                remainingBombs--;
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
                cellHtml.onclick = () => {
                    this.open(cell);
                };
            }
        }
    }

    gameOver() {
        this.isActive = false;
        this.container.classList.add('gameover');
    }

    calcBombsAround(cell) {
        return this.getCellNear(cell).filter(x => x.hasBomb).length;
    }

    getCellNear(cell) {
        let ret = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (this.map[cell.row + i] && this.map[cell.row + i][cell.col + j] && this.map[cell.row + i][cell.col + j] != cell) {
                    ret.push(this.map[cell.row + i][cell.col + j]);
                }
            }
        }
        return ret;
    }

    open(cell) {
        if (!this.isActive) return;
        if (cell.status === 'clear') return;
        let cellHtml = this.container.children[cell.row].children[cell.col];
        if (cell.hasBomb) {
            cellHtml.dataset.status = 'mine';
            this.gameOver();
            return;
        }
        let number = this.calcBombsAround(cell);
        cell.status = 'clear';
        cellHtml.dataset.status = 'clear';
        if (number === 0) {
            this.getCellNear(cell).forEach(x => this.open(x));
        } else {
            cellHtml.textContent = number;
        }
    }
}

class Ceil {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.hasBomb = false;
        this.status = 'default';
    }
}

document.querySelectorAll('.startGame').forEach(x => x.onclick = function () {
    window.currentGame = new Game(this.dataset.rows, this.dataset.cols, this.dataset.mines, document.querySelector('.game'));
});