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
    const left = arr.slice(0, i);
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
        this.encoded = encoded;
    }

    get prioritizedOccurrences() {
         const countsObject = /** @type {{[key: string]: number}} */ ({});
        Array.from(this.encoded.replaceAll('-', '')).forEach((letter) => {
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

    get decoded() {
        const letters = Array.from(this.encoded);
        let decoded = '';
        letters.forEach((letter) => {
            switch (letter) {
                case '-': decoded += ' '; break;
                default: {
                    var code = ((letter.charCodeAt(0) - 97 + this.id) % 26) + 97;
                    decoded += String.fromCharCode(code);
                    break;
                }
            }
        });
        return decoded;
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
        .filter(x => x.isLegit)
        .find(x => x.decoded === 'northpole object storage');

    log(valid);
    log(valid?.decoded);

    return valid?.id;
};


// handleInput(doIt, input.ex2, 2);
handleInput(doIt, input.input, 2);
