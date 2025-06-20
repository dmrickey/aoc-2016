import { handleInput } from '../../utils/handle-input.mjs';
import { log } from '../../utils/log.mjs';
import * as input from './input.mjs';

log('Day 2 part 2');

const A = 'A';
const B = 'B';
const C = 'C';
const D = 'D';

class Keypad {
    position = [0, 2];

    code = '';

    pad = [
        [0, 0, 1, 0, 0],
        [0, 2, 3, 4, 0],
        [5, 6, 7, 8, 9],
        [0, A, B, C, 0],
        [0, 0, D, 0, 0],
    ];

    get current() {
        return this.pad[this.position[1]]?.[this.position[0]];
    }

    /** @param {string} str */
    move(str) {
        /** @type {Array<'U'|'L'|'R'|'D'>} */
        const _moves = /** @type {Array<'U'|'L'|'R'|'D'>} */ (str.split(''));
        _moves.forEach((m) => {
            const previous = [...this.position];
            
            switch (m) {
                case 'U': this.position[1]--; break;
                case 'L': this.position[0]--; break;
                case 'R': this.position[0]++; break;
                case 'D': this.position[1]++; break;
            }

            if (!this.current) this.position = [...previous];
        });

        this.pushTheButton();
    }

    pushTheButton() {
        this.code += this.current;
    }
}

/**
 * @param {string} input
 */
const doIt = (input) => {
    const keypad = new Keypad();
    const directions = input.trim().split(/\s+/);

    directions.forEach(x => keypad.move(x));

    return keypad.code;
};


handleInput(doIt, input.example, 2);

handleInput(doIt, input.input, 2);