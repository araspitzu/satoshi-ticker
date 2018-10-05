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
        $('#sateur').empty();   
        $('#sateur').append("1€ = " + satoshiEUR + " sats"); 
    });

    
}