import EmbarkJS from 'Embark/EmbarkJS';
//import config from '../../embarkArtifacts/config/blockchain';
import $ from 'jquery';

// import your contracts
// e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';

import luv_crowdsale from 'Embark/contracts/luv_crowdsale';
import luv_token from 'Embark/contracts/luv_token';

var rate = 0;

$(document).ready(function() {
    
    EmbarkJS.onReady();

    //Stats displayed:

    //Current Supply
    luv_token.methods.totalSupply().call().then(value => {
        $("#luvMinted").text((parseFloat(value / 1e18)).toFixed(18) + " LUV");
    });

    //Collected Ethereum
    luv_crowdsale.methods.weiRaised().call().then(value => {
        $("#ethCollected").text((parseFloat(value / 1e18)).toFixed(18) + " ETH");
    });

    //Rate
    luv_crowdsale.methods.rate().call().then(value => {
        $("#rate").text((parseFloat(value)).toFixed(18) + " LUV/ETH");  //rate() is luv/eth rate
        rate = value;
    });

    //Price
    luv_crowdsale.methods.getCurrentPrice().call().then(value => {
        $("#price").text((parseFloat(value / 1e18)).toFixed(18) + " ETH/LUV");
    });

    //Default Input Box Values:
    //$("#ethBox").val(parseFloat($("#ethBox").val()).toFixed(18));
    //$("#luvBox").val(parseFloat($("#luvBox").val()).toFixed(18));
});

//ETH input field
$("#ethBox").change(function() {
    $("#ethBox").val(Math.abs(parseFloat($("#ethBox").val())).toFixed(18));
    $("#luvBox").val(parseFloat($("#ethBox").val()*rate).toFixed(18)); // eth/luv
});

//LUV input field
$("#luvBox").change(function() {
    $("#luvBox").val(Math.abs(parseFloat($("#luvBox").val())).toFixed(18));
    $("#ethBox").val(parseFloat($("#luvBox").val()/rate).toFixed(18)); // luv/eth
});

//Buy Luv Button
$("#buyLuv_btn").click(function() {
    web3.eth.getAccounts().then(accounts => {
        let weiPayed = $("#ethBox").val()*1e18; //tuns to int
        luv_crowdsale.methods.buyTokens(accounts[0]).send({value: weiPayed});
        //$("#buyLuv_btn").text(accounts[0]); //for testing puproses
    })
    .catch(error => console.log(error));
});

//Countdown timer
const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

const utcDate = 1561118456; //Equal to opening time of crowdsale -- It's Unix Epoch time

let countDown = new Date(utcDate*second).getTime(),
    x = setInterval( function() {

      let now = new Date().getTime(),
          distance = countDown - now;

        $("#days").text(Math.floor(distance / (day)) + " D"),
        $("#hours").text(Math.floor((distance % (day)) / (hour)) + " H"),
        $("#minutes").text(Math.floor((distance % (hour)) / (minute)) + " M"),
        $("#seconds").text(Math.floor((distance % (minute)) / second) + " S");
      
      //Remove countdown from site when ICO launch date is reached
      if (distance < 0) {
        clearInterval(x);
        $('#countdown').hide();
        $('#post_countdown').removeAttr('hidden');
      }

    }, second)


