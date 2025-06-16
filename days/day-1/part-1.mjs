import { log } from '../../utils/log.mjs';
import * as input from './input-day-1.mjs';

const compass = /** @type {const} */ ('NESW');

class Direction {
    /** @type { 'L' | 'R' } */
    turn;
    blocks;

    /**
     * @param {string} x 
     */
    constructor(x) {
        this.turn = x[0];
        this.blocks = +x.slice(1);
    }
}

/**
 * @param {object} input 
 * @param {string} input.directions
 * @param {number} [input.expected]
 */
const handleInput = ({ directions, expected }) => {
    if (expected) log('expected: ' + expected);

    const mapped = directions
        .split(',')
        .map(x => x.trim())
        .map(x => new Direction(x));

    let facing = 'N';
    const position = { x: 0, y: 0 };

    mapped.forEach(({ turn, blocks }) => {
        const i = compass.indexOf(facing)
        switch (turn) {
            case 'L': facing = compass[(i - 1 + compass.length)%(compass.length)]; break;
            case 'R': facing = compass[(i + 1 + compass.length)%(compass.length)]; break;
            default: throw new Error('should never happen');
        };

        switch (facing) {
            case 'N': position.y += blocks; break;
            case 'E': position.x += blocks; break;
            case 'S': position.y -= blocks; break;
            case 'W': position.x -= blocks; break;
        }
    });

    log('answer: ' + (Math.abs(position.x) + Math.abs(position.y)));
};


handleInput(input.ex1);
handleInput(input.ex2);
handleInput(input.ex3);
handleInput(input.ex3point5);
handleInput(input.ex4);
handleInput(input.ex5);

log('\nfinal answer:');
handleInput(input.input);