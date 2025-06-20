import { handleInput } from '../../utils/handle-input.mjs';
import { log } from '../../utils/log.mjs';
import * as input from './input.mjs';

/** @typedef {string} Sector */

class IpAddress {
    /** @type {string} */
    #address;
    /** @type {Sector[]} */
    #bracedSectors;
    /** @type {Sector[]} */
    #normalSectors;

    /** @param {string} address */
    constructor(address) {
        /** @type {Sector[]} */
        const braced = [];
        /** @type {Sector[]} */
        const normal = [];

        const matches = [...address.matchAll(/([^\[][a-z]*)|(\[[a-z]*\])/g)];
        matches.forEach(([match]) => {
            if (match.startsWith('[')) {
                braced.push(match.substring(1, match.length - 1));
            }
            else {
                normal.push(match);
            }
        });

        this.#address = address;
        this.#bracedSectors = braced;
        this.#normalSectors = normal;
    }

    /** @returns {boolean} */
    get supportsTls() {
        return this.#bracedSectors.every(x => !this.#hasAbba(x)) && this.#normalSectors.some(x => this.#hasAbba(x));
    }

    get supportsSsl() {
        const normalBits = [...new Set(this.#normalSectors.flatMap(x => this.#sslBits(x)))];
        const bracedBits = [...new Set(this.#bracedSectors.flatMap(x => this.#sslBits(x)))];

        return normalBits.some(n => bracedBits.some(b => b[0] === n[1] && n[0] === b[1]));
    }

    /**
     * @param {Sector} sector
     * @returns {boolean}
     */
    #hasAbba(sector) {
        for (let i = 0; i <= Array.from(sector).length - 4; i++) {
            if (sector[i] === sector[i + 3]
                && sector[i + 1] === sector[i + 2]
                && sector[i] !== sector[i + 1]
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {Sector} sector
     * @returns {string[]}
     */
    #sslBits(sector) {
        const bits = [];
        for (let i = 0; i <= Array.from(sector).length - 3; i++) {
            if (sector[i] === sector[i + 2]
                && sector[i] !== sector[i + 1]
            ) {
                bits.push(sector[i] + sector[i + 1] + sector[i + 2]);
            }
        }
        return bits;
    }
}

class AllIps {
    /** @type {IpAddress[]} */
    addresses;

    /** @param {string} input */
    constructor(input) {
        this.addresses = input.split('\n').map((line) => new IpAddress(line));
    }

    get tlsCount() {
        return this.addresses.filter(x => x.supportsTls).length;
    }

    get sslCount() {
        return this.addresses.filter(x => x.supportsSsl).length;
    }
}

/**
 * @param {string} input 
 */
const doIt = (input) => {
    const ips = new AllIps(input);
    return ips.tlsCount;
};

log('Day 7 part 1');
handleInput(doIt, input.ex1, 1);
handleInput(doIt, input.input, 1);

/**
 * @param {string} input 
 */
const doIt2 = (input) => {
    const ips = new AllIps(input);
    return ips.sslCount;
};

log('Day 7 part 2');
handleInput(doIt2, input.ex2, 2);
handleInput(doIt2, input.input, 2);
