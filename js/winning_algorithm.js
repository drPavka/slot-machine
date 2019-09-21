class WinningAlgorithm {
    #algorithms = [];

    constructor() {

    }

    /**
     *
     * @param line {TOP | CENTER | BOTTOM}
     * @param symbols {RegExp}
     * @param cost {Number}
     */
    //@todo array should be sorted in descending order after add
    add(line, symbols, cost) {
        this.#algorithms.push(
            {
                line, symbols, cost
            }
        )
    }

    /**
     * Check if there any winning combination in combination
     * @param combinations {Combination}
     * @return {WinningCombination | null}
     */
    check(combinations) {
        let result = null;
        for (let {line, symbols, cost} of this.#algorithms) {
            if (line !== null) {
                if (symbols.test('' + combinations.get(line))) {
                    result = new WinningCombination(combinations.get(line), cost);
                    break;
                }
            } else {
                let r;
                //@ignore
                if (r = symbols.exec('' + combinations)) {
                    //call constructor with variable arguments length
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
                    let args = r[0].split('');
                    //@todo why without this it doesn't work and lost first param????
                    args.unshift(null);
                    let row = new (Function.prototype.bind.apply(Row, args));

                    result = new WinningCombination(row, cost);
                    break;
                }
            }

        }
        if (!result) {
            console.debug('No winning combinations found');
        }
        return result;
    }

}

