const BARx3 = 0;
const BAR = 1;
const BARx2 = 2;
const SEVEN = 3;
const CHERRY = 4;

const TOP = 0;
const CENTER = 1;
const BOTTOM = 2;


function Reels($container) {
    const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) );
// current settings give a value of 149, rounded to 150
    const REEL_RADIUS = 150;

    function createSlots(ring) {

        var slotAngle = 360 / SLOTS_PER_REEL;

        var seed = getSeed();

        for (var i = 0; i < SLOTS_PER_REEL; i++) {
            var slot = document.createElement('div');

            slot.className = 'slot';

            // compute and assign the transform for this slot
            var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

            slot.style.transform = transform;

            // setup the number to show inside the slots
            // the position is randomized to
            var img = document.createElement('img');
            img.src = 'img/2xBAR.png';
            slot.appendChild(img);

            // add the poster to the row
            ring.appendChild(slot);
        }
    }

    function getSeed() {
        // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
        return Math.floor(Math.random() * (SLOTS_PER_REEL));
    }

    this.spin = (timer) => {
        //var txt = 'seeds: ';
        for (var i = 1; i < 4; i++) {
            var oldSeed = -1;
            /*
            checking that the old seed from the previous iteration is not the same as the current iteration;
            if this happens then the reel will not spin at all
            */
            var oldClass = document.getElementById('ring' + i).className;
            if (oldClass.length > 4) {
                oldSeed = parseInt(oldClass.slice(10));
                console.log(oldSeed);
            }
            var seed = getSeed();
            while (oldSeed == seed) {
                seed = getSeed();
            }

            document.getElementById('ring' + i).style.animation = 'back-spin 1s, spin-' + seed + ' ' + (timer + i * 0.5) + 's';
            document.getElementById('ring' + i).className = 'ring spin-' + seed;
        }

    };
    createSlots(document.getElementById('ring1'));
    createSlots(document.getElementById('ring2'));
    createSlots(document.getElementById('ring3'));

    /*$(document).ready(function() {

        // initiate slots



        // hook start button
        /!*$('.go').on('click',function(){
            var timer = 2;
            spin(timer);
        })*!/

       /!* // hook xray checkbox
        $('#xray').on('click',function(){
            //var isChecked = $('#xray:checked');
            var tilt = 'tiltout';

            if($(this).is(':checked')) {
                tilt = 'tiltin';
                $('.slot').addClass('backface-on');
                $('#rotate').css('animation',tilt + ' 2s 1');

                setTimeout(function(){
                    $('#rotate').toggleClass('tilted');
                },2000);
            } else {
                tilt = 'tiltout';
                $('#rotate').css({'animation':tilt + ' 2s 1'});

                setTimeout(function(){
                    $('#rotate').toggleClass('tilted');
                    $('.slot').removeClass('backface-on');
                },1900);
            }
        })

        // hook perspective
        $('#perspective').on('click',function(){
            $('#stage').toggleClass('perspective-on perspective-off');
        })*!/
    });*/
}

/**
 * @emits start
 * @emits complete
 */
Reels.prototype.start = function () {
    let reels_result = [
        new Combination([
            {line: TOP, symbols: new Row(CHERRY, CHERRY, CHERRY)},
            {line: CENTER, symbols: new Row(SEVEN, BAR, BAR)},
            {line: BOTTOM, symbols: new Row(CHERRY, SEVEN, BAR)}
        ]),
        new Combination([
            {line: CENTER, symbols: new Row(CHERRY, SEVEN, CHERRY)},
            {line: TOP, symbols: new Row(SEVEN, BAR, BAR)},
            {line: BOTTOM, symbols: new Row(CHERRY, SEVEN, BAR)}
        ]),
        new Combination([
            {line: CENTER, symbols: new Row(BAR, SEVEN, CHERRY)},
            {line: TOP, symbols: new Row(SEVEN, BAR, BAR)},
            {line: BOTTOM, symbols: new Row(BARx2, SEVEN, BAR)}
        ]),

    ];
    console.debug('reels started');
    this.spin(2);
    this.emit('start');

    console.debug('reels rolling completed');
    let result = reels_result[Math.floor(Math.random() * Math.floor(reels_result.length))];
    this.emit('complete', result);
};

Object.assign(Reels.prototype, EventEmitter.prototype);
