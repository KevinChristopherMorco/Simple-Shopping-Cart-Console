class ShoppingCart {
    constructor() {
        this.item = []
        this.price = []
        this.grandTotal = 0
    }

    addToCart(item) {
        let checkInput = /\d+/ //Still need to do research about regex
        let counter = -1
        if (item.match(checkInput) === null) {
           
            if (!this.item.includes(item)) {
                this.item.push(item)
                this.price.push(Math.floor(Math.random() * 100))

              for(let i=0;i<this.item.length;i++){
                counter +=1
              }
                return `${item} was added to your cart, the price is ₱${this.price[counter]}`
            } else {
                return `${item} item already in the cart`

            }
        } else {
            return `INVALID RESPONSE`
        }
    }

    removeItem(item) {
        if (this.item.includes(item) == true) {
            let itemIndex = this.item.indexOf(item)
            this.item.splice(itemIndex, 1)
            this.price.splice(itemIndex, 1)
            return `${item} was removed in your cart`
        } else {
            return `${item} was not found in your cart`
        }
    }

    getDetails() {
        let items = {}
        this.grandTotal = 0
        if (this.item.length != 0) {
            for (let i = 0; i < this.item.length; i++) {
                items[this.item[i]] = this.price[i]
            }

            for (let [key, value] of Object.entries(items)) {
                console.log(`${key} ₱${value}`);
                this.grandTotal += value
            }
            return `Grand Total: ₱${this.grandTotal}`
        } else {
            return `Your cart is empty`
        }
    }

    payItem(payment) {
         //Still need to do research about the different methods for validation
        if (!isNaN(payment)) { 
            if (this.grandTotal > payment) {
                return `Transaction failed, insufficient funds`
            } else {
                return `Transaction successful, payment made`
            }
        } else {
            return `INVALID RESPONSE`
        }
    }
}

let cart = new ShoppingCart()
let leaveShop = false

while (leaveShop === false) {
    console.log('-------------------------------------------------')
    console.log('Welcome to ExpressGroceries, we have everything you need!\nTo start shopping, choose the number of the appropriate response below:\n1:Add to Cart\n2:Check your Cart\n3:Pay & Checkout\n4:Exit the shop')
    console.log('-------------------------------------------------')
    let userChoice = parseInt(prompt('Choose an option:'))
    console.log('-------------------------------------------------')

    switch (userChoice) {
        case 1:
            console.log('----Shopping Spree Section----')
            let addChoice = true
            while (addChoice === true) {
                let userItem = prompt('Choose an Item:')
                if (userItem.toUpperCase() == "BACK") {
                    console.log(`-------------------------------------------------`)
                    console.log(`Returning to main menu...`)
                    addChoice = false
                } else {
                    console.log(cart.addToCart(userItem.toUpperCase()))
                    console.log(`-------------------------------------------------`)
                    console.log(`----Type "BACK" to stop adding items and return to main menu----`)
                    console.log(`-------------------------------------------------`)

                }
            }
            break;

        case 2:
            console.log(`----My Cart----`)
            console.log(cart.getDetails())
            if (cart.item.length != 0) {
                let removeChoice = true
                while (removeChoice === true) {
                    console.log(`-------------------------------------------------`)
                    console.log(`Do you want to remove an item in your cart?[Yes/No]`)
                    let answer = prompt(`Your answer:`)
                    console.log(`-------------------------------------------------`)
                    if (answer.toUpperCase() === 'YES') {
                        let remove = prompt(`Enter the item that you want to remove:`)
                        console.log(`-------------------------------------------------`)
                        console.log(cart.removeItem(remove.toUpperCase()))
                        console.log(`-------------------------------------------------`)
                        console.log(`----My Cart----`)
                        console.log(cart.getDetails())

                    } else if (answer.toUpperCase() === 'NO') {
                        removeChoice = false
                    } else {
                        console.log(`INVALID RESPONSE, please answer[Yes/No]`)

                    }
                }
            }
            break;

        case 3:
            console.log(`----Pay & Checkout----`)
            console.log(cart.getDetails())
            let payment = parseFloat(prompt(`Payment value:`))
            console.log(`-------------------------------------------------`)
            console.log(cart.payItem(payment))
            console.log(`-------------------------------------------------`)
            break;

        case 4:
            console.log(`Thank you for shopping at ExpressGroceries, come again!`)
            leaveShop = true
            break;

        default:
            console.log(`INVALID RESPONSE, please choose the number of the options below.`)
            break;
    }
}