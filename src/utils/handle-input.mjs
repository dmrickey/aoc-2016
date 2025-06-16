import { log } from './log.mjs';

const red = '\x1b[31m';
const green = '\x1b[32m';
const reset = '\x1b[0m';

/**
 * @template T
 * @typedef InputData<T>
 * @property {string} input
 * @property {T} example
 * @property {T} example2
 */

/**
 * @template T
 * @param {(input: string) => T} dayFunction 
 * @param {InputData<T>} input 
 * @param {1 | 2} day 
 */
export const handleInput = (dayFunction, input, day) => {
    const result = dayFunction(input.input);
    const example = day === 1 ? input.example : input.example2;

    log(`example: ${example}`);

    const color = example == result ? green : red;
    const icon = example == result ? '\u2713' : '❌'; 

    log(color + `result: ${result}${icon}` + reset);
}