$(document).ready(function() {

    printPrice();
    localStorage[BPI_IDX] = null;

	window.setInterval(printPrice, CHECK_INTERVAL_MILLIS);
});

var COIN_SATOSHI = 100000000; //Number of satoshis in 1BTC
var CHECK_INTERVAL_MILLIS = 60000 //60s
var BPI_IDX = "BPI";
var BPI_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

function printPrice() {

    var selectedCurrency = $("#currency-selector").find(":selected").val();

    getCoindeskBPI(function(bpi) {

        var fiatBTCPrice = bpi[selectedCurrency].rate_float;
        var satoshiFIAT = (COIN_SATOSHI / fiatBTCPrice).toFixed(0);
        var fiatSymbol = bpi[selectedCurrency].symbol;
        
        $('#satfiat').empty();   
        $('#satfiat-10').empty();
        $('#satfiat-100').empty();
        $('#satfiat-1000').empty();
            
        $('#satfiat').append("1 "+ fiatSymbol +" = " + (satoshiFIAT).toLocaleString() + " sats"); 
        $('#satfiat-10').append("10 "+ fiatSymbol +" = " + (satoshiFIAT * 10).toLocaleString() + " sats"); 
        $('#satfiat-100').append("100 "+ fiatSymbol +" = " + (satoshiFIAT * 100).toLocaleString() + " sats"); 
        $('#satfiat-1000').append("1000 "+ fiatSymbol +" = " + (satoshiFIAT * 1000).toLocaleString() + " sats"); 
   
    });
    
}

function updateInput() {
    var customFiatValue = $('#satfiat-custom').val();
    var selectedCurrency = $("#currency-selector").find(":selected").val();

    getCoindeskBPI(function(bpi) {

        var fiatBTCPrice = bpi[selectedCurrency].rate_float;
        var satoshiFIAT = (COIN_SATOSHI / fiatBTCPrice).toFixed(0);
        var fiatSymbol = bpi[selectedCurrency].symbol;
        var customSatValue = (customFiatValue * satoshiFIAT);

        $('#customfiat').empty();
        $('#customfiat').append(fiatSymbol + " = " + customSatValue.toLocaleString() + " sats");

    });

}


function getCoindeskBPI(onDataAvailable) {

    var coinDeskResponse = localStorage[BPI_IDX];

    if(coinDeskResponse === undefined) {
        console.log("Cached response was empty");
        $.get(BPI_URL, function(data){ 
            localStorage[BPI_IDX] = data;
            onDataAvailable(JSON.parse(localStorage[BPI_IDX]).bpi); 
        });
    } else {

        var responseDate = new Date(JSON.parse(coinDeskResponse).time.updatedISO); //1min granularity
        var millisElapsed = Math.floor((Date.now() - responseDate));

        if(millisElapsed < CHECK_INTERVAL_MILLIS) {
            console.log("Using cached response:");
            onDataAvailable(JSON.parse(coinDeskResponse).bpi);
        } else {
            $.get(BPI_URL, function(data){ 
                console.log("Refreshed the response");
                localStorage[BPI_IDX] = null; //??
                localStorage[BPI_IDX] = data;
                onDataAvailable(JSON.parse(localStorage[BPI_IDX]).bpi); 
            });
        }
    }


}


