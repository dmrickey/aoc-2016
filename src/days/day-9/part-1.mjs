import { handleInput } from '../../utils/handle-input.mjs';
import { log } from '../../utils/log.mjs';
import * as input from './input.mjs';

class File {
    /**
     * @param {string} encrypted 
     */
    constructor(encrypted) {
        this.encrypted = encrypted;
    }

    decrypt() {
        let malleable = this.encrypted;

        let decrypted = '';

        while (true) {
            const [good, second] = malleable.split(/\((.*)/s);
            decrypted += good;

            if (!second) break;

            const [operation, remaining] = second.split(/\)(.*)/s);
            if (!remaining) break;

            const [qty, repeats] = operation.split('x');
            const toRepeat = remaining.substring(0, +qty);
            for (let i = 0; i < +repeats; i++) {
                decrypted += toRepeat;
            }

            malleable = remaining.slice(+qty);
        }

        this.decryptedValue = decrypted;
    }

    /** @returns {string} */
    get decrypted() {
        if (!this.decryptedValue) throw new Error('must be decrypted first');

        return this.decryptedValue;
    }

    /** @returns {number} */
    get v2DecryptedLength() {
        return -1;
    }
}

/**
 * @param {string} input
 */
const doIt = (input) => {
    const file = new File(input);
    file.decrypt();
    log(file.decrypted);
    return file.decrypted.length;
};

log('Day 9 part 1');
handleInput(doIt, input.ex1, 1);
handleInput(doIt, input.ex2, 1);
handleInput(doIt, input.ex3, 1);
handleInput(doIt, input.ex4, 1);
handleInput(doIt, input.ex5, 1);
handleInput(doIt, input.ex6, 1);
handleInput(doIt, input.input, 1);

/**
 * @param {string} input
 */
const doIt2 = (input) => {
    const file = new File(input);
    return file.v2DecryptedLength;
};

log('Day 9 part 1');
handleInput(doIt2, input.ex1, 2);
handleInput(doIt2, input.ex6, 2);
handleInput(doIt, input.input, 2);
