import { log } from '../../utils/log.mjs';
import * as input from './input.mjs';

log('Day 2 part 1');

class Triangle {
    /** @type {Array<number>} */
    sides;

    constructor(line) {
        this.sides = line.trim().split(/\s+/).map(x => +x);
        this.sides.sort();
    }

    get canBeTriangle() {
        return ((this.sides[0] + this.sides[1]) > this.sides[2])
        && ((this.sides[1] + this.sides[2]) > this.sides[0])
        && ((this.sides[2] + this.sides[0]) > this.sides[1]);
    }
}

/**
 * @param {object} input 
 * @param {string} input.input
 * @param {number} [input.expected]
 */
const handleInput = ({ input, expected }) => {
    if (expected) log('expected: ' + expected);

    const triangles = input
        .trim().split('\n')
        .map((line) => new Triangle(line));

    const valid = triangles
        .filter(t => t.canBeTriangle)
        .length;

    log('answer: ' + valid);
};


log('\nfinal answer:');
handleInput(input.input);