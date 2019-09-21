const START_BALANCE = 1000;
const SPIN_COST = 1;

//Components
function Reels($container) {

}

Reels.prototype.start = function () {
    let reels_result = new Combination();
    console.debug('reels started');
    this.emit('start');

    console.debug('reels rolling completed');
    this.emitEvent('complete', reels_result);
};

Object.assign(Reels.prototype, EventEmitter.prototype);

function Spin_Button(container) {
    this.$ = container;
    this.$.addEventListener('click', () => {
        console.debug('spin button click');
        this.emit('click');
    })
}

Object.assign(Spin_Button.prototype, EventEmitter.prototype);

function Pay_Table($container) {
    this.container = $container;
}

Object.assign(Pay_Table.prototype, EventEmitter.prototype);
/**
 *
 * @param winning_combination WinningCombination
 */
Pay_Table.prototype.add = function(winning_combination){
    this.container.appendChild(document.createElement('tr'));
}
function Balance_Inbox(container) {
    this.container = container;
    this.container.addEventListener('input', (event) => {
        this.emit('adjust', parseInt(event.target.value))
    })
}

Object.assign(Balance_Inbox.prototype, EventEmitter.prototype);
Balance_Inbox.prototype.init = function () {

};

Balance_Inbox.prototype.set = function (value) {
    this.container.value = value;
};

//Models

class Combination {
    #current;

    set value(combination_array) {

    }
}

class WinningCombination {
    load(combination){}
    get cost(){

    }
    get symbols(){

    }
}


class Balance {
    #value;

    constructor(initial_balance) {
        this.#value = initial_balance;

    }

    init() {
        console.debug('initial change balance event triggered');
        this.on('change', () => {
            if (!this.#value) {
                this.emit('finish');
            }
        });
        this.emit('change', this.#value);
    }

    increase(value) {
        this.#value += value;
        console.debug('increase balance on %s', value);
        this.emit('change', this.#value)
    }

    decrease(value) {
        this.#value -= value;
        console.debug('decrease balance on %s', value);
        this.emit('change', this.#value)
    }

    force(value) {
        //force doesn't trigger event because there shouldn't be any reaction
        console.debug('force balance value to %s', value);
        this.#value = value;
    }

}

Object.assign(Balance.prototype, EventEmitter.prototype);

class Reels_Algorithm {

}

class SlotMachine {
    /**
     * @var Reels_Algorithm
     */
    #reels_algorithm;
    /**
     * @var WinningAlgorithm
     */
    #winning_algorithm;
    /**
     * @var #balance Balance
     */
    #balance;

    constructor(balance) {
        this.#balance = balance;

    }

    /**
     * @desc if is not set - there will be no win ever, but this is not an error
     * @param winning_algorithm
     */
    set winning_algorithm(winning_algorithm) {
        //@todo - validate
        this.#winning_algorithm = winning_algorithm;
    }

    /**
     *
     * @desc If is not set  - then random order
     * @param reels_algorithm
     */
    set reels_algorithm(reels_algorithm) {
        //@todo  - validate
        this.#reels_algorithm = reels_algorithm;
    }

    /**
     *
     * @param reels Reels
     * @param start_button Spin_Button
     * @param pay_table Pay_Table
     * @param balance_inbox Balance_Inbox
     */
    init(reels, start_button, pay_table, balance_inbox) {

        this.#balance.on('change', balance_inbox.set.bind(balance_inbox));
        this.#balance.on('finish', this.finish.bind(this));
        this.#balance.init();
        balance_inbox.on('adjust', this.#balance.force.bind(this.#balance));
        start_button.on('click', reels.start.bind(reels));
        reels.on('start', this.#balance.decrease.bind(this.#balance, SPIN_COST));

        reels.on('complete', (combination) => {
            //@todo analyze combination, get winning combination, change balance, redraw pay_table
            if(false){
                //increase balance by wininnig combination cost
                this.#balance.increase(1);
                //add wininnig combination to pay_table
                pay_table.add(1)
            }
            /*console.debug('maybe increase balance');

            console.debug('change balance event triggered')
            this.emit('change', this.#value)*/
        });

    }
    finish(){
        //@todo block all components
        console.log('Game is over');
    }
    analyze(combination){
        //@todo finish check
        let result = this.#winning_algorithm.check({combination});
        return result;
    }
}




