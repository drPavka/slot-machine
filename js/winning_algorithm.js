const BARx3 = 0;
const BAR = 1;
const BARx2 = 2;
const SEVEN = 3;
const CHERRY = 4;

const TOP = 0;
const CENTER = 1;
const BOTTOM = 2;

class WinningAlgorithm {
    #algorithms = [];

    constructor() {

    }

    add(line, symbols, cost) {
        this.#algorithms.push(
            {
                line, symbols, cost
            }
        )
    }
    check(line, symbols){
        let result = null;
        if(this.#algorithms.some(()=>{})){
            result = {line, symbols, cost}
        }

        return result;
    }

}
/*

function analyze(winning_algorithm) {
    //winning combination
    return;
}
*/
