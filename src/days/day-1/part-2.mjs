import { log } from '../../utils/log.mjs';
import * as input from './input-day-2.mjs';

const compass = /** @type {const} */ ('NESW');

class History {
    /** @type { Record<number, Set<number>>} */
    history = {};
    /** @param {{ x: number, y: number }} _ */
    add({ x, y }) {
        this.history[x] ||= new Set();
        this.history[x].add(y);
    }
    /** @param {{ x: number, y: number }} _ */
    has({ x, y }) {
        const _x = this.history[x];
        return !!_x?.has(y);
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
        this.turn = /** @type { 'L' | 'R' } */ (x[0]);
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

    const history = new History();
    let facing = 'N';
    const position = { x: 0, y: 0 };
    history.add(position);

    let hasRepeat = false;
    for (const { turn, blocks } of mapped) {
        if (hasRepeat) break;

        const currentIndex = compass.indexOf(facing)
        switch (turn) {
            case 'L': facing = compass[(currentIndex - 1 + compass.length) % (compass.length)]; break;
            case 'R': facing = compass[(currentIndex + 1 + compass.length) % (compass.length)]; break;
            default: throw new Error('should never happen');
        };

        for (let i = 0; i < blocks; i++) {
            switch (facing) {
                case 'N': position.y += 1; break;
                case 'E': position.x += 1; break;
                case 'S': position.y -= 1; break;
                case 'W': position.x -= 1; break;
            }
            if (history.has(position)) {
                hasRepeat = true;
                break;
            }
            history.add(position);
        }
    }

    log('answer: ' + (Math.abs(position.x) + Math.abs(position.y)));
};


handleInput(input.ex1);

log('\nfinal answer:');
handleInput(input.input);