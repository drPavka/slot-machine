let slot_machine;

const init = () => {
    //moved here to be visible
    const winning_algorithm = new WinningAlgorithm();
    winning_algorithm.add(BOTTOM, new RegExp([CHERRY, CHERRY, CHERRY].join('')), 4000);
    winning_algorithm.add(TOP, new RegExp([CHERRY, CHERRY, CHERRY].join('')), 2000);
    winning_algorithm.add(CENTER, new RegExp([CHERRY, CHERRY, CHERRY].join('')), 1000);

    //@todo  - if line === NULL regexp should be complicated with start and end symbols
    winning_algorithm.add(null, new RegExp("^" + [SEVEN, SEVEN, SEVEN].join('') + "$"), 150);
    //@todo  - any combination of CHERRY and 7  - does it mean reverse order too?
    winning_algorithm.add(null, new RegExp('^\\d?' + [CHERRY, SEVEN].join('') + '\\d?$', "m"), 75);
    winning_algorithm.add(null, new RegExp("^" + [BARx3, BARx3, BARx3].join('') + "$"), 50);
    winning_algorithm.add(null, new RegExp("^" + [BARx2, BARx2, BARx2].join('') + "$"), 20);
    winning_algorithm.add(null, new RegExp("^" + [BAR, BAR, BAR].join('') + "$"), 10);
    //@todo Combination of any BAR symbols on any line - 5


    //create componenta class instances
    const components = Array.from(document.querySelectorAll('[data-bind]')).reduce((acc, $) => {
        if ($.dataset.bind) {
            console.debug($.dataset.bind.toLowerCase() + ' created');
            acc[$.dataset.bind.toLowerCase()] = new (window[$.dataset.bind])($);
        }
        return acc;
    }, []);

    const balance = new Balance(START_BALANCE);
    const reels_algorithm = new Reels_Algorithm();
    //const winning_combination = new WinningCombination();

    slot_machine = new SlotMachine(balance);
    slot_machine.winning_algorithm = winning_algorithm;
    slot_machine.reels_algorithm = reels_algorithm;

    //@todo - tricky call - should be fixed
    slot_machine.init(
        components['reels'],
        components['spin_button'],
        components['pay_table'],
        components['balance_inbox']
    );
};
