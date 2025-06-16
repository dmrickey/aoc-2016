import { log } from '../../utils/log.mjs';
import * as input from './input.mjs';

log('Day 2 part 1');

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

    get canBeTriangle() {
        return ((this.sides[0] + this.sides[1]) > this.sides[2])
        && ((this.sides[1] + this.sides[2]) > this.sides[0])
        && ((this.sides[2] + this.sides[0]) > this.sides[1]);
    }
}

/**
 * @param {object} input 
 * @param {string} input.input
 * @param {number} [input.expected2]
 */
const handleInput = ({ input, expected2 }) => {
    if (expected2) log('expected: ' + expected2);

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
        .filter(t => t.canBeTriangle)
        .length;

    log('answer: ' + valid);
};


log('\nfinal answer:');
handleInput(input.input);