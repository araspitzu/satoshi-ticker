$(document).ready(function() {

	refreshPrice();

	window.setInterval(refreshPrice, 15000); //15s
});

var COIN_SATOSHI = 100000000; //Number of satoshis in 1BTC

function refreshPrice() {
    console.log('Refreshing the price');

    $.get("https://api.coindesk.com/v1/bpi/currentprice.json", function(data){
        var result = JSON.parse(data);
        eurbtcPrice = result.bpi.EUR.rate_float;
        satoshiEUR = (COIN_SATOSHI / eurbtcPrice).toFixed(0);
        $('#satfiat').empty();   
        $('#satfiat-10').empty();
        $('#satfiat-100').empty();
        $('#satfiat-1000').empty();

        
        $('#satfiat').append("1€ = " + satoshiEUR + " sats"); 
        $('#satfiat-10').append("10€ = " + satoshiEUR * 10 + " sats"); 
        $('#satfiat-100').append("100€ = " + satoshiEUR * 100 + " sats"); 
        $('#satfiat-1000').append("1000€ = " + satoshiEUR * 1000 + " sats"); 

    });

    
}