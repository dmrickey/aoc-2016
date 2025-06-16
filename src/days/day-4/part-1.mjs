import { handleInput } from '../../utils/handle-input.mjs';
import { log } from '../../utils/log.mjs';
import * as input from './input.mjs';

log('Day 4 part 1');

/**
 * @param {string} str 
 * @param {number} i 
 */
const splitAtIndex = (str, i) => {
    const arr = Array.from(str);
    const left = arr.slice(0, i + 1);
    const right = arr.slice(i + 1);
    return [left.join(''), right.join('')];
}

class RoomDecoder {
    /** @type {string} */
    hash;

    /** @param {string} line */
    constructor(line) {
        let [nameWithId, hash] = line.split('[');
        this.hash = hash.slice(0, 5);

        const idSplitIndex = nameWithId.lastIndexOf('-');
        const [encoded, id] = splitAtIndex(nameWithId, idSplitIndex);

        this.id = +id;
        this.encoded = encoded.replaceAll('-', '');
    }

    get prioritizedOccurrences() {
         const countsObject = /** @type {{[key: string]: number}} */ ({});
        Array.from(this.encoded).forEach((letter) => {
            countsObject[letter] ||= 0;
            countsObject[letter]++;
        });

        const counts = [];
        for (const key in countsObject) {
            counts.push({ key, value: countsObject[key] });
        }

        counts.sort((a, b) => {
            const countComparison = b.value - a.value;
            const letterComparison = a.key.localeCompare(b.key);

            return countComparison
                ? countComparison
                : letterComparison;
        });

        return counts.slice(0, 5).map(x => x.key).join('');
    }

    get isLegit() {
        return this.prioritizedOccurrences === this.hash;
    }
}

/**
 * @param {string} input 
 */
const doIt = (input) => {
    const rooms = input
        .trim().split('\n')
        .map(x => x.trim())
        .map((line) => new RoomDecoder(line));

    const valid = rooms
        .filter(t => t.isLegit)
        .reduce((acc, curr) => acc += curr.id, 0);

    return valid;
};


handleInput(doIt, input.ex1, 1);
handleInput(doIt, input.input, 1);
