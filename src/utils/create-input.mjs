
/**
 * @template T
 * @param {string} input 
 * @param {T} [ex1] 
 * @param {T} [ex2] 
 * @returns {{ input: string, example: any, example2: any }}
 */
export const createInput = (input, ex1, ex2) => ({
    input,
    example: ex1 ?? '?',
    example2: ex2 ?? '?',
})