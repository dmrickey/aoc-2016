import { log } from '../../utils/log.mjs';
import * as input from './input.mjs';

log('Day 2 part 1');

class Keypad {
    position = [1, 1];

    code = '';

    pad = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
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
 * @param {object} input 
 * @param {string} input.input
 * @param {number} [input.expected]
 */
const handleInput = ({ input, expected }) => {
    if (expected) log('expected: ' + expected);

    const keypad = new Keypad();
    const directions = input.trim().split(/\s+/);

    directions.forEach(x => keypad.move(x));

    log('answer: ' + keypad.code);
};


handleInput(input.example);

log('\nfinal answer:');
handleInput(input.input);