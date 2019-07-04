let reversals = "no";
let number = 7;
let data;
let spread = 3;
let UvsR3 = ["upright3", "reversed3"];
let UvsR5 = ["upright5", "reversed5"];
let controlback = false;

function spreadSetting(value){
    spread = value;
}
function reversed(value){
    reversals = value;
}

$(document).ready(function(){
        $("#menu").load("components/menu.html");
        $("#warning").load("components/warning.html");    
});

// Reading starts here
function thirdScreen(arg) {
window.scrollTo(0, 0);
number = 7;        

document.getElementById("div-content").innerHTML='<div class="instruction-title">Instructions</div><div class="first-instructions"><p class="item1">Think about what you wanna ask and formulate a clear question. You can say it aloud or just in your mind.</p><p class="item2">While focusing on your question, press the "Shuffle Cards" button. You should keep your question in your mind till the shuffling is complete.</p><p class="item3">Three or five cards from the top of the shuffled deck will appear on the screen containing your answer. The number of cards depends on what spread you are using.</p><p style="text-align:center;margin-top: -20px;"><br><button id="1" type="button" class="btn btn-outline-info btn-lg" onclick="start()">SHUFFLE CARDS</button></p><div>';
}
function start(){
    $('#second-screen').removeClass('second-screen-main'); //remove margin-top to keep shuffle.gif centralized 
    $('#content').css('min-height', '100vh');   
    document.getElementById("div-content").innerHTML='<div id="shuffle"><img class="shuffling" src="images/shuffle.gif" /></div>';
    getData();
    
}
function getData(){

     $.ajax({
        url: "js/cardsinfo.json",
        dataType: "json",
        cache: false,
        success: function (json) {

          data = json;
        shuffleCards(); 
        setTimeout(function(){
            
        $('#second-screen').addClass('second-screen-main');  
        $('#content').css('min-height', '');    
        if (parseInt(spread, 10) === 3){     
        document.getElementById("div-content").innerHTML='<div id="show-cards"><div id="show-cards-top"><p class="item1" style="font-size:calc(15px + 0.5vw);margin-top: 30px;">This is your three cards spread containing the answers to your question. The card on the left represents the past, the card in the middle the present situation, and the one on the right represents a possible future.</p><p class="item2" style="font-size:calc(15px + 0.5vw);">Click on each card to know their meaning.</p></div><div id="cards"></div><div><button type="button" class="btn btn-outline-primary" style="margin-top: 10px;color:#ffffff" id="newq" onclick="thirdScreen(this.id);">Ask another question</button></div></div>'; 
        } else {
        document.getElementById("div-content").innerHTML='<div id="show-cards"><div id="show-cards-top"><p class="item1" style="font-size:calc(15px + 0.5vw);margin-top: 30px;">This is your five cards spread containing the answers to your question. The cards one to five from left to right represent the past, recent past, present, near future, and future, respectively.</p><p class="item2" style="font-size:calc(15px + 0.5vw);">Click on each card to know their meaning.</p></div><div id="cards"></div><div><button type="button" class="btn btn-outline-primary" style="margin-top: 10px;color:#ffffff" onclick="thirdScreen();">Ask another question</button></div></div>';    
            
        }
            
        showCards();
    }, number + [100 + 10]);    
        }
});
}
function shuffleAlgorithm(array) {
  for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

  return array;

    
}

function shuffleCards () {
data = shuffleAlgorithm(data);
    if (number > number - [number - 1] ){
        number--;
        window.setTimeout(shuffleCards, 1000);
        
    }
    
}

// Show reading results
function showCards() {
    if (reversals === "no") {
    for (let i = 0; i < spread; i++) {
        if (parseInt(spread, 10) === 3){   
        let images = '<img class="upright3" src="' + data[i]['img'] + '" id="' + data[i]['id'] + '1" onclick="showModal(this.id)"/>';
        $('#cards').append(images);
        }else {
        let images = '<img class="upright5" src="' + data[i]['img'] + '" id="' + data[i]['id'] + '1" onclick="showModal(this.id)"/>';
        $('#cards').append(images);   
        }
    }
    } else {
      for (let i = 0; i < spread; i++) {
        if (parseInt(spread, 10) === 3){
        let position3 = UvsR3[Math.floor(Math.random()*UvsR3.length)];    
        let images = '<img class="'+ position3 + '" src="' + data[i]['img'] + '" id="' + data[i]['id'] + '1" onclick="showModal(this.id)"/>';
        $('#cards').append(images);
        }else {
        let position5 = UvsR5[Math.floor(Math.random()*UvsR5.length)];   
        let images = '<img class="'+ position5 + '" src="' + data[i]['img'] + '" id="' + data[i]['id'] + '1" onclick="showModal(this.id)"/>';
        $('#cards').append(images);   
        }
    }  
    }
    for (let i = 0; i < spread; i++) {
        let text = '<div class="modal fade modal2" id="' + data[i]['id'] + '12" tabindex="-1" role="dialog" aria-labelledby="warningModalCenterTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content modal-content2" style="font-family: "Stylish", sans-serif;"><div class="modal-header"><h5 class="modal-title" style="color:#000000;" id="warningModalLongTitle">' + data[i]['name'] + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="hideModal()"><span aria-hidden="true">&times;</span></button></div><div class="modal-body modal-body2" style="text-align:justify;font-size:calc(12px + 0.5vw);color: #000000;">' + data[i]['meaning'] + '<div style="text-align:right;font-size:calc(12px + 0.5vw);color: #000000;margin: 0px 10px 10px 0px"></div></div></div></div></div>';
        $('#div-content').append(text);
        
        
    }     
}

// Show modals for cards explanation
function showModal(id){     
$('#' + id + '2').modal({backdrop: 'static', keyboard: false});  
$('body').addClass("no-scroll");  

$('.modal-body').bind('scroll', function() {
$('.modal-body').scrollTop(0);
$('.modal-body').unbind('scroll');    

});
}
      
function hideModal() {
$('body').removeClass("no-scroll");    
}
// Help section
function showHelp(arg) {
    if (arg === 'help'){
window.scrollTo(0, 0);        
controlback = true;        
$('#content').addClass('display');
$('#help').addClass('display');        
$('#div-help').removeClass('display').load("components/help.html");    
        }
 if (arg === "outhelp"){     
$('#content').removeClass('display');
$('#help').removeClass('display');      
$('#div-help').addClass('display');     
 }    
}

//Android back button handler methods
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", backKeyDown, false);
}
function backKeyDown(answer) { 
    if (controlback === false){
    $('#warning').removeClass("display");    
    $('#warningModal').modal({backdrop: 'static', keyboard: false});
    $('body').addClass("no-scroll");      
    }
    if (controlback === true){
    window.scrollTo(0, 0);    
    $('#content').removeClass('display');
    $('#help').removeClass('display');    
    $('#div-help').addClass('display');  
    controlback = false;    
    }
    if (answer === "no"){
    $( "#warningModal" ).modal( "toggle" );
    $('body').removeClass("no-scroll");      
    }
}
function exitApp() {
    navigator.app.exitApp();
}
