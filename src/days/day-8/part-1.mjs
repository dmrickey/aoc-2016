import { handleInput } from '../../utils/handle-input.mjs';
import { log } from '../../utils/log.mjs';
import * as input from './input.mjs';

class Screen {

    /** @constant */
    #on = '#';
    /** @constant */
    #off = '.';

    /** @type {Array<Array<string>>} */
    #screen;

    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.#screen = new Array(y).fill('').map(_ => new Array(x).fill(this.#off));
    }

    dump() {
        for (let y = 0; y < this.#screen.length; y++) {
            const row = this.#screen[y];
            console.log(row.join(''));
        }
        console.log('\n');
    }

    /**
     * @param {string} instruction
     */
    handleInstruction(instruction) {
        const parts = instruction.split(' ');
        switch (parts.shift()) {
            case 'rect': {
                this.#enable(...( /** @type {[number, number]} */ (parts[0].split('x').map(x => +x))));
                break;
            }
            case 'rotate': {
                const dir = parts.shift();
                const specific = +parts[0].split('=')[1];
                const qty = +(parts.at(-1) || 0);
                switch (dir) {
                    case 'row':
                        this.#rotateRow(specific, qty);
                        break;
                    case 'column':
                        this.#rotateColumn(specific, qty);
                        break;
                }
                break;
            }
        }
    }

    /**
     * @param {number} width 
     * @param {number} height 
     */
    #enable(width, height) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.#screen[y][x] = this.#on;
            }
        }
    }

    /**
     * @param {number} col 
     * @param {number} qty 
     */
    #rotateColumn(col, qty) {
        let curr = '';
        for (let y = 0; y < this.#screen.length; y++) {
            curr += this.#screen[y][col];
        }
        curr = curr.slice(curr.length - qty) + curr.substring(0, curr.length - qty);
        const updated = Array.from(curr);

        for (let y = 0; y < this.#screen.length; y++) {
            this.#screen[y][col] = updated[y];
        }
    }

    /**
     * @param {number} row 
     * @param {number} qty 
     */
    #rotateRow(row, qty) {
        let curr = this.#screen[row].join('');
        curr = curr.slice(curr.length - qty) + curr.substring(0, curr.length - qty);
        this.#screen[row] = Array.from(curr);
    }

    get enabled() {
        let count = 0;
        for (let y = 0; y < this.#screen.length; y++) {
            const row = this.#screen[y];

            for (let x = 0; x < row.length; x++) {
                const element = row[x];
                if (element === this.#on) {
                    count++;
                }
            }
        }
        return count;
    }
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {(arg: string) => number}
 */
const doIt = (x, y) => (input) => {
    const screen = new Screen(x, y);
    screen.dump();

    const instructions = input.split('\n');
    instructions.forEach((instruction) => {
        screen.handleInstruction(instruction);
        // screen.dump();
    });
    screen.dump();

    return screen.enabled;
};

log('Day 8 part 1');
handleInput(doIt(7, 3), input.ex1, 1);
handleInput(doIt(50, 6), input.input, 1);
