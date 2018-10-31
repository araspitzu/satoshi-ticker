$(document).ready(function() {

	refreshPrice();

	window.setInterval(refreshPrice, 15000); //15s
});

var COIN_SATOSHI = 100000000; //Number of satoshis in 1BTC

function refreshPrice() {
    console.log('Refreshing the price');

    var selectedCurrency = $("#currency-selector").find(":selected").val();

    $.get("https://api.coindesk.com/v1/bpi/currentprice.json", function(data){
        var result = JSON.parse(data);
        var  fiatBTCPrice = result.bpi[selectedCurrency].rate_float;
        var satoshiFIAT = (COIN_SATOSHI / fiatBTCPrice).toFixed(0);
        var fiatSymbol = result.bpi[selectedCurrency].symbol;
        
        var customFiat = $('#satfiat-custom').val();
        var customSat = (customFiat * satoshiFIAT);
        
        $('#satfiat').empty();   
        $('#satfiat-10').empty();
        $('#satfiat-100').empty();
        $('#satfiat-1000').empty();
        $('#customfiat').empty();
            
        $('#satfiat').append("1 "+ fiatSymbol +" = " + (satoshiFIAT).toLocaleString() + " sats"); 
        $('#satfiat-10').append("10 "+ fiatSymbol +" = " + (satoshiFIAT * 10).toLocaleString() + " sats"); 
        $('#satfiat-100').append("100 "+ fiatSymbol +" = " + (satoshiFIAT * 100).toLocaleString() + " sats"); 
        $('#satfiat-1000').append("1000 "+ fiatSymbol +" = " + (satoshiFIAT * 1000).toLocaleString() + " sats"); 
        $('#customfiat').append(fiatSymbol + " = " + customSat.toLocaleString() + " sats");
    });
    
}


