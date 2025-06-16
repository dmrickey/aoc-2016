import { log } from '../../utils/log.mjs';
import * as input from './input-day-1.mjs';

class Compass {
    /** @type { 'N' | 'S' | 'E' | 'W'} */
    currentFacing = 'N';
    
    /**
     * @param {'L' | 'R'} t 
     */
    turn(t) {
        switch (t) {
            case 'L':
                switch (this.currentFacing) {
                    case 'N': this.currentFacing = 'W'; break;
                    case 'S': this.currentFacing = 'E'; break;
                    case 'E': this.currentFacing = 'N'; break;
                    case 'W': this.currentFacing = 'S'; break;
                }
                break;
            case 'R':
                switch (this.currentFacing) {
                    case 'N': this.currentFacing = 'E'; break;
                    case 'S': this.currentFacing = 'W'; break;
                    case 'E': this.currentFacing = 'S'; break;
                    case 'W': this.currentFacing = 'N'; break;
                }
                break;
        }
    }
}

class Direction {
    /** @type { 'L' | 'R' } */
    turn;
    blocks;

    /**
     * @param {string} x 
     */
    constructor(x) {
        this.turn = /** @type {'L' | 'R'} */ (x[0]);
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

    const compass = new Compass();
    const position = { x: 0, y: 0 };

    mapped.forEach(({ turn, blocks }) => {
        compass.turn(turn);

        switch (compass.currentFacing) {
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