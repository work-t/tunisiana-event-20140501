var oor_client = "", clock, win = false;

$(function () {
    // Display the right thumbnail instead of the slideshow animated gif when the slideshow is running
    $( 'body' ).bind( 'vegaswalk', function( e, bg ) {
	    var src = $( bg ).attr( 'src' ).replace( 'background', 'thumbnail' );
		$( '#thumbnail' ).attr( 'src', src );
		
	});

    // Auto Vegaswalk
    $( '#pause' ).trigger( "click" );


    $('.frame-form .btn-reset').bind('click', function () {
        $('.frame-form input').val('');
    });

    $('.frame-form .input.type-text').bind('click', function () {
        $(this).initKeyboard();
    });

    $('#slickQuiz').slickQuiz({
        checkAnswerText: 'Suivant',
        nextQuestionText: 'Suivant',
        backButtonText: '',
        tryAgainText: '',
        skipStartButton: false,
        numberOfQuestions: 1,
        randomSort: true,
        randomSortQuestions: true,
        randomSortAnswers: true,
        preventUnanswered: false,
        completionResponseMessaging: false,
        disableResponseMessaging: true,
        hideQuizName: true,
        hideQuizHeader: true
    });
    $('.locationReload').click(function () {
        location.reload();
    });


    $('.next-frame').click(function () {
        if ($(this).hasClass('btn-submit')) {
            if (validForm()) nextFrame();
        } else {
            nextFrame();
        }
    });
	
});
validForm = function () {
    start_clock();
    return true;
    tunisiana.log($('#input_name').text(), true);
    tunisiana.log($('#input_lastname').text(), true);
    tunisiana.log($('#input_phone').text(), true);
    if ($('#input_name').html() != '' && $('#input_lastname').html() != '' && $('#input_phone').html() != '') {
        nouveau_client($('#input_name').html() + ' ' + $('#input_lastname').html());
        return true;
    } else {
        return false;
    }
}
nouveau_client = function (client) {
    oor_client = client;
    start_clock();
}
start_clock = function () {
    clock = $('.clock').FlipClock(tunisiana.timer, {
        clockFace: 'MinuteCounter',
        countdown: true,
        callbacks: {
            stop: function () {
				if(!win){
                	client_lose();
				}
            }
        }
    });
}

client_lose = function (data) {
    $('.vegas-background').hide();
    $('#frame-5').css('z-index', '90').fadeOut('slow', function () {
        $(this).hide();
    });
    $('#frame-7').css('z-index', '10').fadeIn('slow');
}
client_win = function () {
	win = true;
	clock.stop();
	/*var numbers = new Array('2 DT','3 DT','5 DT');
	var msg = numbers[Math.floor(Math.random()*numbers.length)];
	$('.frame-sucess .txt.cadeau').text(msg);*/
	var path_get_cadeau = location.href + 'DB/get_cadeau.php';
	$.ajax({
	   type: "POST",
	   url: path_get_cadeau,
	   success: function(msg){
		   if(msg != '0'){
			   $('.frame-sucess .txt.cadeau').text(msg);
			 nextFrame();
		   }
			else
				alert('Erreur base de donnée!');
	   }
	 });
}
nextFrame = function () {
    $('.vegas-background').hide();
    tunisiana.log('----------------------------------------------------', true);
    tunisiana.log('					NextFrame						', true);
    tunisiana.log('----------------------------------------------------', true);
    $('#frame-' + tunisiana.currentFrame).css('z-index', '90').fadeOut('slow', function () {
        $(this).hide();
    });
    tunisiana.log('Hide frame' + tunisiana.currentFrame);
    tunisiana.currentFrame++;
    $('#frame-' + tunisiana.currentFrame).css('z-index', '10').fadeIn('slow', function () {
        tunisiana.log('Show frame' + tunisiana.currentFrame);
    });
};