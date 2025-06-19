import { handleInput } from '../../utils/handle-input.mjs';
import { log } from '../../utils/log.mjs';
import { input } from './input.mjs';

log('Day 3 part 1');

class Triangle {
    /** @type {Array<number>} */
    sides;

    /** @param {string} line */
    constructor(line) {
        this.sides = line.trim().split(/\s+/).map(x => +x);
        this.sides.sort();
    }

    get isLegit() {
        return ((this.sides[0] + this.sides[1]) > this.sides[2])
        && ((this.sides[1] + this.sides[2]) > this.sides[0])
        && ((this.sides[2] + this.sides[0]) > this.sides[1]);
    }
}

/**
 * @param {string} input
 */
const doIt = (input) => {
    const triangles = input
        .trim().split('\n')
        .map((line) => new Triangle(line));

    const valid = triangles
        .filter(t => t.isLegit)
        .length;

    return valid;
};

handleInput(doIt, input, 1);
