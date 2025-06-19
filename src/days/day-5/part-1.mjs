import { handleInput } from '../../utils/handle-input.mjs';
import { log } from '../../utils/log.mjs';
import { hexHash } from './hex-hash.mjs';
import * as input from './input.mjs';

log('Day 5 part 1');

/**
 * @param {string} input 
 */
const doIt = (input) => {
    let password = '';
    const code  = input;

    let i = 0;
    while (true) {
        const hex = hexHash(`${code}${i}`);
        if (hex.startsWith('00000')) {
            password += hex.charAt(5);
            log(password);
        }

        i++;
        if (password.length === 8) {
            break;
        }
    }

    return password;
};


// handleInput(doIt, input.ex1, 1);
handleInput(doIt, input.input, 1);
