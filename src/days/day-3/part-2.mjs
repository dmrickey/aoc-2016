import { handleInput } from '../../utils/handle-input.mjs';
import { log } from '../../utils/log.mjs';
import { input } from './input.mjs';

log('Day 3 part 2');

class Triangle {
    /** @type {Array<number>} */
    sides;

    /**
     * @param {number} a 
     * @param {number} b 
     * @param {number} c 
     */
    constructor(a, b, c) {
        this.sides = [a, b, c];
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
    const lines = input
        .trim().split('\n')
        .map(x => x.trim())
        .map(x => x.split(/\s+/).map(x => +x));

    const triangles = [];
    for (let i = 0; i < lines.length; i+=3) {
        const a = lines[i];
        const b = lines[i + 1];
        const c = lines[i + 2];
        triangles.push(new Triangle(a[0], b[0], c[0]));
        triangles.push(new Triangle(a[1], b[1], c[1]));
        triangles.push(new Triangle(a[2], b[2], c[2]));
    }

    const valid = triangles
        .filter(t => t.isLegit)
        .length;

    return valid;
};

handleInput(doIt, input, 2);
