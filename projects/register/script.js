function itemPrice() {
    // generate an item's price
    var price = Math.random() * 10;
    price = +price.toFixed(2);
    return price;
}

function customerPaid(price) {
    // generate what the customer paid (> item price)
    return Math.ceil(price / 5) * 5;
}

function addData() {
    var price = itemPrice();
    var paid = customerPaid(price);

    d3.select("#item-price").text('$' + price);
    d3.select("#customer-paid").text('$' + paid);
    d3.select("#change-due").property('value', '');

    change = paid - price;

    return change;
}

    // d3.select("#my-button").on("click", function() {
    //     console.log(d3.select('#change').attr("value"));
        // console.log(d3.select('#change').attr("value"));
        // console.log(+this.value);

function watch() {
    var change = addData();
    console.log(change)
    d3.select("#change-due").on("change", function() {
        console.log(change)
        console.log(+this.value);
        if(Math.abs(+this.value - change) > 1e-5) {
            // print dammit Simon could do this
            console.log('dammit!')
            d3.select('#response-message').text("Dammit you are worse than Simon at math!")
        } else {
            // print 'great job'
            console.log('good job!')
            d3.select('#response-message').text("Great Job!")

        }
        setTimeout(function () {
            console.log('timeout')
            change = addData();
            d3.select('#response-message').text("")
        }, 3000)
        // pause 5 seconds and restart

      });

    // userChange =
}