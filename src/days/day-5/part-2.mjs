import { handleInput } from '../../utils/handle-input.mjs';
import { log } from '../../utils/log.mjs';
import { hexHash } from './hex-hash.mjs';
import * as input from './input.mjs';

log('Day 5 part 1');

/**
 * @param {string} input 
 */
const doIt = (input) => {
    let password = new Array(8).fill('');
    const code  = input;

    let i = 0;
    while (true) {
        const hex = hexHash(`${code}${i}`);
        if (hex.startsWith('00000')) {
            const index = +hex.charAt(5);
            if (!(isNaN(index) || index >= 8) && !password[index]) {
                password[index] = hex.charAt(6);
                log(password.map(x => x || ' ').join(''));
            }
        }

        i++;
        if (password.filter(x => !!x).length === 8) {
            break;
        }
    }

    return password.join('');
};


// handleInput(doIt, input.ex1, 2);
handleInput(doIt, input.input, 2);
