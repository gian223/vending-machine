"use strict";
/* globals VendingMachine */
class Controller  { // eslint-disable-line no-unused-vars
  static setup(){
    let theVendingMachine;
    theVendingMachine = new VendingMachine('Ara Vending Machine', 'Madras Street');


    theVendingMachine.addCoin('Ten Cent Coin', 23.62, 2.66, 10, 10);
    theVendingMachine.addCoin('Twenty Cent Coin', 27.62, 4.66, 20, 10);
    theVendingMachine.addCoin('Fifty Cent Coin', 31.62, 5.66, 50, 10);
    theVendingMachine.addCoin('One Dollar Coin', 22.62, 7.66, 100, 10);
    theVendingMachine.addCoin('Two Dollar Coin', 24.62, 10.66, 200, 10);

    theVendingMachine.addProduct('A1','Coke', 'Black', 2.50, 300, 5);
    theVendingMachine.addProduct('A2','Fanta', 'Orange', 2.50, 350, 5);
    theVendingMachine.addProduct('A3','Diet Coke', 'Black', 2.50, 400, 5);
    theVendingMachine.addProduct('B1','Salt & Vinegar Chips', 'Green', 1.50, 250, 2);
    theVendingMachine.addProduct('B2','Salted Chips', 'Red', 1.50, 250, 1);
    theVendingMachine.addProduct('B3','Chicken Chips', 'Yellow', 1.50, 250, 7);
    theVendingMachine.addProduct('C1','Red Skittles', 'Red', 3.50, 500, 9);
    theVendingMachine.addProduct('C2','Fruit Skittles', 'Red', 3.50, 550, 6);
    theVendingMachine.addProduct('C3','Wild Berry Skittles', 'Purple', 3.50, 600, 3);
    theVendingMachine.displayCoins();
    return theVendingMachine;

  }
}
