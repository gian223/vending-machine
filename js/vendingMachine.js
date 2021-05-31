class VendingMachine {
    constructor(newName, newLocation) {
        this.name = newName;
        this.location = newLocation;
        this.allMyCoins = [];
        this.allMyProducts = [];
    }

    addCoin(newAlloy, newDiameter, newWeight, newValue, newQuantity) {
        const addCoin = new Coin(newAlloy, newDiameter, newWeight, newValue, newQuantity);
        this.allMyCoins.push(addCoin);
    }

    addProduct(newId, newName, newColour, newWeight, newPrice, newQuantity) {
        const newProduct = new Product(newId, newName, newColour, newWeight, newPrice, newQuantity);
        this.allMyProducts.push(newProduct);
    }

    displayCoins() {
        // REMOVE ALL TABLE COLUMNS(TD) AND APPEND UPDATED COINS
        let table = document.querySelector(".coin-holder");
        while (table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }

        // FUNCTION TO APPEND COIN QUANTITIES
        const updateCoinQuantity = function (quantity) {
            let table = document.querySelector(".coin-holder");
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(quantity));
            table.appendChild(td);
        }
        for (let i = 0; i < this.allMyCoins.length; i++) {
            let coin = this.allMyCoins[i].value;
            coin === 200 ? updateCoinQuantity(this.allMyCoins[i].quantity) : '';
            coin === 100 ? updateCoinQuantity(this.allMyCoins[i].quantity) : '';
            coin === 50 ? updateCoinQuantity(this.allMyCoins[i].quantity) : '';
            coin === 20 ? updateCoinQuantity(this.allMyCoins[i].quantity) : '';
            coin === 10 ? updateCoinQuantity(this.allMyCoins[i].quantity) : '';
        }
    }

    insertCoins(coinValue) {
        const coin10 = this.allMyCoins[4];
        const coin20 = this.allMyCoins[3];
        const coin50 = this.allMyCoins[2];
        const coin100 = this.allMyCoins[1];
        const coin200 = this.allMyCoins[0];
        coinValue === 10 ? coin10.quantity += 1 : null;
        coinValue === 20 ? coin20.quantity += 1 : null;
        coinValue === 50 ? coin50.quantity += 1 : null;
        coinValue === 100 ? coin100.quantity += 1 : null;
        coinValue === 200 ? coin200.quantity += 1 : null;
        // UPDATE VENDING MACHINE COIN HOLDER
        this.displayCoins()
    }

    dispenseCoins(change) {

        // REMOVE COINS FROM VENDING MACHINE COIN HOLDER AND DISPENSE COINS FOR CUSTOMER
        change = Math.abs(change);
        const coin10 = this.allMyCoins[4];
        const coin20 = this.allMyCoins[3];
        const coin50 = this.allMyCoins[2];
        const coin100 = this.allMyCoins[1];
        const coin200 = this.allMyCoins[0];
        change === 200 ? coin200.quantity -= 1 : null;
        change === 190 ? (coin100.quantity -= 1) && (coin50.quantity -= 1) && (coin20.quantity -= 2) : null;
        change === 180 ? (coin100.quantity -= 1) && (coin50.quantity -= 1) && (coin20.quantity -= 2) && (coin10.quantity -= 1) : null;
        change === 170 ? (coin100.quantity -= 1) && (coin50.quantity -= 1) && (coin20.quantity -= 1) : null;
        change === 160 ? (coin100.quantity -= 1) && (coin50.quantity -= 1) && (coin10.quantity -= 1) : null;
        change === 150 ? (coin100.quantity -= 1) && (coin50.quantity -= 1) : null;
        change === 140 ? (coin100.quantity -= 1) && (coin20.quantity -= 2) : null;
        change === 130 ? (coin100.quantity -= 1) && (coin20.quantity -= 1) && (coin10.quantity -= 1) : null;
        change === 120 ? (coin100.quantity -= 1) && (coin20.quantity -= 1) : null;
        change === 110 ? (coin100.quantity -= 1) && (coin10.quantity -= 1) : null;
        change === 100 ? coin100.quantity -= 1 : null;
        change === 90 ? (coin50.quantity -= 1) && (coin20.quantity -= 2) : null;
        change === 80 ? (coin50.quantity -= 1) && (coin20.quantity -= 1) && (coin10.quantity -= 1) : null;
        change === 70 ? (coin50.quantity -= 1) && (coin20.quantity -= 1) : null;
        change === 60 ? (coin50.quantity -= 1) && (coin10.quantity -= 1) : null;
        change === 50 ? coin50.quantity -= 1 : null;
        change === 40 ? coin20.quantity -= 2 : null;
        change === 30 ? (coin20.quantity -= 1) && (coin10.quantity -= 1) : null;
        change === 20 ? coin20.quantity -= 1 : null;
        change === 10 ? coin10.quantity -= 1 : null;

        for (let i = 0; i < dispenseCoin.length; i++) {
            dispenseCoin[i].classList.contains('dispense-coin-200') ? dispenseCoin[i].classList.add('box__dispense-200') : null;
            dispenseCoin[i].classList.contains('dispense-coin-100') ? dispenseCoin[i].classList.add('box__dispense-100') : null;
            dispenseCoin[i].classList.contains('dispense-coin-50') ? dispenseCoin[i].classList.add('box__dispense-50') : null;
            dispenseCoin[i].classList.contains('dispense-coin-20') ? dispenseCoin[i].classList.add('box__dispense-20') : null;
            dispenseCoin[i].classList.contains('dispense-coin-10') ? dispenseCoin[i].classList.add('box__dispense-10') : null;
            // REMOVE CHANGE DISPENSE CLASSES
            setTimeout(function () {
                dispenseCoin[i].classList.remove('box__dispense-200', 'box__dispense-100', 'box__dispense-50', 'box__dispense-20', 'box__dispense-10')
            }, 4000);
        }
        // PLAY SOUND EFFECT FOR COINS DROPPING INTO CHANGE DISPENSER
        const myAudio = new Audio('sounds/coin-dispense.mp3');
        myAudio.play();
        // CLEAR SCREEN FOR NEXT PURCHASE
        screen.textContent = ''
        // DISABLE COINS
        validProduct = false
        // UPDATE VENDING MACHINE COIN HOLDER
        this.displayCoins()
    }

    dispenseProduct(selected) {
        screen.textContent = ''
		const product = this.allMyProducts.find(element => element.id === selected.toUpperCase());
        product.quantity -= 1;

        // DISPENSE PRODUCT
        if (selected.startsWith('a')) {
            document.querySelector(`.product-${selected}`).classList.add('product-a-dispense');
            setTimeout(function () {
            document.querySelector(`.product-${selected}`).classList.remove('product-a-dispense')
            }, 4000);
        } else if (selected.startsWith('b')) {
            document.querySelector(`.product-${selected}`).classList.add('product-b-dispense');
            setTimeout(function () {
                document.querySelector(`.product-${selected}`).classList.remove('product-b-dispense')
            }, 4000);
        } else if (selected.startsWith('c')) {
            document.querySelector(`.product-${selected}`).classList.add('product-c-dispense');
            setTimeout(function () {
                document.querySelector(`.product-${selected}`).classList.remove('product-c-dispense')
            }, 4000);
        }


        // DISABLE COINS UNTIL USER SELECTS ANOTHER PRODUCT
        validProduct = false





		this.displayProducts()
    }

    displayProducts(){
		// UPDATE PRODUCTS IN VENDING MACHINE
        const priceBox = document.querySelectorAll('.container__product-price');
		for(let i = 0; i < products.length; i++){
			for(let i = 0; i < priceBox.length; i++) {
				priceBox[i].textContent = `${products[i].id} | $${(products[i].price / 100).toFixed(2)} | ${products[i].quantity}`;
			}
		}
	}
}