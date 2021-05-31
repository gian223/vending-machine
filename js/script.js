'use strict';
let theVendingMachine;
theVendingMachine = Controller.setup();

const vendingMachineName = document.querySelector('.box__message')
const btn = document.querySelectorAll('.box__keypad-btn');
const screen = document.querySelector('.box__screen');
const message = document.querySelector('.box__message');
const coin = document.querySelectorAll('.coin');
const errorMessage = document.querySelector('.error-message');
const dispenseCoin = document.querySelectorAll('.dispense-coin');
const products = theVendingMachine.allMyProducts;
let validProduct = false
let price = 0;
let selected;
vendingMachineName.textContent = `${theVendingMachine.name}, ${theVendingMachine.location}`;

// DISPLAY PRODUCTS FROM allMyProducts ARRAY
theVendingMachine.displayProducts()

// CHECK IF CUSTOMER CLICKS ON COIN WITH addEventListener
// LOOP THROUGH ALL COIN CLASSES USING querySelectorAll()
for(let i = 0; i < coin.length; i++){
    coin[i].addEventListener('click', function (){

        // CHECK IF A VALID PRODUCT HAS BEEN SELECTED BEFORE COIN CAN MOVE TO VEDNING MACHINE
        if(!validProduct){
            errorMessage.textContent = 'Please choose a product on the vending machine first!'
        }else{
            // MOVE COIN TO VENDING MACHINE COIN SLOT (MANIPULATING DOM CLASSES)
            coin[i].classList.contains('coin10') ? coin[i].classList.add('move-coin10') : null;
            coin[i].classList.contains('coin20') ? coin[i].classList.add('move-coin20') : null;
            coin[i].classList.contains('coin50') ? coin[i].classList.add('move-coin50') : null;
            coin[i].classList.contains('coin100') ? coin[i].classList.add('move-coin100') : null;
            coin[i].classList.contains('coin200') ? coin[i].classList.add('move-coin200') : null;

            // SET SOUND TO PLAY WHEN THE COIN HAS MADE IT TO THE VENDING MACHINE VIA CSS CLASSES ABOVE
            setTimeout(function(){
                const myAudio = new Audio('sounds/coin-inserted.wav');
                myAudio.play();
            }, 800);

            // RETURN COINS BACK TO CUSTOMERS WALLET
            setTimeout(function(){
                coin[i].classList.remove('move-coin10', 'move-coin20', 'move-coin50', 'move-coin100', 'move-coin200')
            }, 1050);

            // UPDATE VENDING MACHINE SCREEN PRICE AS COINS ARE ENTERED
            const coinValue = coin[i].value;
            let updatedPrice = price -= coinValue
            screen.textContent = `$${(updatedPrice / 100).toFixed(2)}`;

            // INSERT COINS INTO allMyCoins ARRAY IN VENDING MACHINE
            // THIS WILL UPDATE LIVE COIN HOLDER
            theVendingMachine.insertCoins(coinValue);

            // CHECK IF CORRECT AMOUNT IS INSERTED, GIVE CHANGES AND DISPENSE PRODUCT
            if(price === 0){
                screen.textContent = '$0.00'
                // DISPENSE PRODUCT ONLY AS NO CHANGE
                setTimeout(function(){
                    theVendingMachine.dispenseProduct(selected)
                }, 1500);
            }else if(price < 0){
                // DISPENSE CHANGE AND PRODUCT
                setTimeout(function(){
                    theVendingMachine.dispenseCoins(price);
                    theVendingMachine.dispenseProduct(selected)
                }, 2500);
            }

        } // END OF VALID PRODUCT
    }); // END OF CLICK EVENT LISTENER
} // END OF COIN LOOP EVENT LISTENER

// CHECK WHAT BUTTONS ON KEYPAD CUSTOMER HAS CLICKED
// CLICK EVENT LISTENER EVERYTIME KEYPAD BUTTON IS CLICKED
for(let i = 0; i < btn.length; i++){
    btn[i].addEventListener('click', function(){
        // IF OK BUTTON CLICKED, CHECK IF THE PRODUCT EXISTS IN allMyProducts ARRAY
        if(btn[i].value === 'ok'){
            if(theVendingMachine.allMyProducts.some(code => code.id === screen.textContent)){
                function isProduct(product){
                    validProduct = true
                    errorMessage.textContent = ''
                    return product.id === screen.textContent;
                }
                const product = theVendingMachine.allMyProducts.find(isProduct);
                selected = screen.textContent.toLowerCase();
                screen.textContent = `$${(product.price / 100).toFixed(2)}`;
                price = product.price;
            }else{
                // RETURN INVALID PRODUCT IF IT DOES NOT EXIST
                screen.textContent = 'Invalid!';
                setTimeout(function(){
                    screen.textContent = '';
                }, 2000);
            }
        }else if(btn[i].value === 'clr'){
            // CLEAR VENDING MACHINE SCREEN IF CLEAR BUTTON CLICKED
            screen.textContent = '';
        }else{
            // PRINT SELECTED KEYPAD VALUE TO SCREEN
            screen.textContent += btn[i].value
        } // END OF IF
    }); // END OF CLICK EVENT LISTENER
} // END OF LOOP EVENT LISTENER