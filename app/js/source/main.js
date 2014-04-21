(function(){
  'use strict';

  $(document).ready(init);

  var clock;
  var timer;
  var numbers;

  function init(){
    $('#start').click(start);
    $('#board td').click(reveal);//searches any td inside of table #board
  }

  function reveal(){
    debugger;
    var row = $(this).parent().index();
    var col = $(this).index();
    var pos = (row * 4) + col;
    var img = numbers[pos];

    $(this).find('.back').css('background-image', 'url("./media/' + img + '.png")';
    //calling the background-image css property and defining url based on what td is clicked.
    $(this).find('.flipper').addClass('rotate');
    //add class 'rotate' to flipper div inside of specific td
    $(this).addClass('show');
    //add class 'show' to td that is clicked.
    checkMatch();
}

  function checkMatch(){
    var $matches = $('.show');//variable that holds array of any tds that have been clicked.

    if($matches.length === 2){
      var td1 = $matches[0];
      var td2 = $matches[1];
      var img1 = $(td1).find('.back').css('background-image');
      var img2 = $(td2).find('.back').css('background-image');

      if(img1 === img2){
        $matches.addClass('match');
        $matches.off('click');//turns off click event handler for these tds
      }else{
        setTimeout(function()){//calling anonymous function
          $matches.find('.flipper').removeClass('rotate');
          setTimeout(function(){
            $matches.find('.back').css('background-image', '');
          }, 1000);//sets background image of td to '' (erases image url) after 1 sec.
        }, 1000);//removes class 'rotate' after 1 second. Image is hidden.
      }

      $matches.removeClass('show');
    }
  }

  function start(){
    create();
    randomize();

    clearInterval(timer);/*good idea to set extra clearInterval() on front
    end to prevent exponential growth of time interval speed*/
    clock = $('#clock').data('time') * 1;
    timer = setInterval(updateClock, 1000);
  }

  function create(){ //build 20 index array out of 10 images
    debugger;
    numbers = [];

    for(var i = 0; i < 2; i++){
      for(var j = 0; j < 10; j++){
        numbers.push(j);
      }
    }
  }

  function randomize(){ //randomize numbers array
    for(var i = 0; i < numbers.length; i++){
      var random = Math.floor(Math.random() * numbers.length);
      var temp = numbers[random];
      numbers[random] = numbers[i];
      numbers[i] = temp;
    }
  }

  function updateClock(){
    clock--;

    if(clock > 0 && clock < 10){
      warning();
    } else if(clock === 0){
      clearInterval(timer);
      results();
    }

    $('#clock').text(clock);
  }

  function warning(){
    var opacity = $('body').css('opacity') * 1;
    opacity -= 0.1;
    $('body').css('opacity', opacity);
  }

  function results(){
    var matches = $('.match').length;

    if(matches === 20){
      alert('Winner');
    }else{
      alert('Try Again');
    }
  }

})();
