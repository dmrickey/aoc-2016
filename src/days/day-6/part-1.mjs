import { handleInput } from '../../utils/handle-input.mjs';
import { log } from '../../utils/log.mjs';
import * as input from './input.mjs';

class Parser {
    /**
     * { 0: { e: 2, f: 1, n: 1}, 1: { a: 3, b: 1, e: 2 }, ... }
     * @type {Record<number, Record<string, number>>}
     */
    lines;

    /** @param {string} input */
    constructor(input) {
        const lines = input.split('\n');

        // initialize this.lines
        this.lines = {};
        const size = lines[0].length;
        new Array(size).fill('').forEach((_, i) => this.lines[i] = {});

        lines.forEach((line) => {
            const letters = Array.from(line);
            letters.forEach((letter, i) => {
                this.lines[i][letter] ||= 0;
                this.lines[i][letter]++;
            })
        });
    }

    get maxOccurrenceDecoded() {
        return this.#decoded('max');
    }
    
    get minOccurrenceDecoded() {
        return this.#decoded('min');
    }

    /** @param { 'min' | 'max' } occurence */
    #decoded(occurence) {
        let decoded = '';
        for (const index in this.lines) {
            const possibilities = this.lines[index];
            const current = { letter: '', count: occurence === 'max' ? 0 : 99 };
            for (const letter in possibilities) {
                if ((occurence === 'max' && possibilities[letter] > current.count)
                    || (occurence === 'min' && possibilities[letter] < current.count)
                ) {
                    current.letter = letter;
                    current.count = possibilities[letter];
                }
            }
            decoded += current.letter;
        }

        return decoded;
    }
}

/**
 * @param {string} input 
 */
const doIt = (input) => {
    const parser = new Parser(input);
    return parser.maxOccurrenceDecoded;
};

log('Day 6 part 1');
handleInput(doIt, input.ex1, 1);
handleInput(doIt, input.input, 1);

/**
 * @param {string} input 
 */
const doIt2 = (input) => {
    const parser = new Parser(input);
    return parser.minOccurrenceDecoded;
};

log('Day 6 part 1');
handleInput(doIt2, input.ex1, 2);
handleInput(doIt2, input.input, 2);
