$(function(){
	$('#add-submit').click(function(){
		var a = $('#add-english').val();
		var b = $('#add-POS').val();
		var c = $('#add-chinese').val();
		$.post('/ajax/word/add',{
			english: a,
			POS: b,
			chinese: c
		},function(res){
			if(!res.err){
				$('#add-notifier')
					.removeClass('gray red')
					.addClass('green')
					.text('new word was added successfully');
			}else{
				$('#add-notifier')
					.removeClass('gray green')
					.addClass('red')
					.text('adding new word failed');
			}
		});
		$('#add-notifier').removeClass('red green')
			.addClass('gray')
			.text('wait please...');
		$('#add-reset').click();
	});

	$('#import-button').click(function(){
		$.post('/ajax/word/import',{},function(res){
			if(!res.err){
				$('#import-notifier')
					.removeClass('gray red')
					.addClass('green')
					.text('import words successfully');
			}else{
				$('#import-notifier')
					.removeClass('gray green')
					.addClass('red')
					.text('import words failed');
			}
		});
		$('#import-notifier').removeClass('red green')
			.addClass('gray')
			.text('wait please...');
	});

	$('#clear-button').click(function(){
		$.post('/ajax/word/clear',{},function(res){
			if(!res.err){
				$('#clear-notifier')
					.removeClass('gray red')
					.addClass('green')
					.text('clear database successfully');
			}else{
				$('#clear-notifier')
					.removeClass('gray green')
					.addClass('red')
					.text('clear database failed');
			}
		});
		$('#clear-notifier').removeClass('red green')
			.addClass('gray')
			.text('wait please...');
	});

	$('#index-button').click(function(){
		$.post('/ajax/word/index',{},function(res){
			if(!res.err){
				$('#index-notifier')
					.removeClass('gray red')
					.addClass('green')
					.text('index rebuilt successfully');
			}else{
				$('#index-notifier')
					.removeClass('gray green')
					.addClass('red')
					.text('index rebuilding failed');
			}
		});
		$('#index-notifier').removeClass('red green')
			.addClass('gray')
			.text('wait please...');
	});

	$('#start-button').click(function(){
		var n = $('#start-number').val();
		if(!n || n<1){
			$('#start-notifier')
				.removeClass('gray green')
				.addClass('red')
				.text('not a valid number');
			return;
		}
		$.post('/ajax/quiz/start',{
			num:n
		},function(res){
			if(!res.err){
				$('#start-quiz').addClass('hidden');
				$('#do-quiz').removeClass('hidden');
				quizButton2();
				$('#start-notifier').text('');
				$('#start-button').text('restart');
			}else{
				$('#start-notifier')
					.removeClass('gray green')
					.addClass('red')
					.text('start quiz failed');
			}
		});
		$('#start-notifier')
			.removeClass('red green')
			.addClass('gray')
			.text('wait please...');
	});

	var quizButton1 = function(){
		var x = $('#quiz-english').val().trim();
		if(!x){
			$('#quiz-notifier')
				.removeClass('gray green')
				.addClass('red')
				.text('it seems that you have not typed a word');
			return;
		}
		$.post('/ajax/quiz/do',{english:x},function(res){
			if(!res.err){
				$('#quiz-notifier')
					.removeClass('gray red')
					.addClass('green')
					.text('your answer is right!');
			}else{
				$('#quiz-notifier')
					.removeClass('gray green')
					.addClass('red')
					.text('key: '+res.err);
			}
			if(res.done){
				$('#quiz-submit')
					.text('result')
					.off('click')
					.click(quizButton2);
			}else{
				$('#quiz-submit')
					.text('next')
					.off('click')
					.click(quizButton2);
			}
		});
		$('#quiz-notifier')
			.removeClass('red green')
			.addClass('gray')
			.text('wait please...');
	};
	var quizButton2 = function(){
		$.post('/ajax/quiz/next',{},function(res){
			if(!res.err){
				if(!res.remain){
					$('#quiz-submit').off('click');
					$('#do-quiz').addClass('hidden');
					$('#quiz-result').removeClass('hidden');
					$('#result-right').text(res.right);
					$('#result-wrong').text(res.wrong);
					$('#result-total').text(res.total);
					$('#result-ratio').text(res.ratio);

					return;
				}
				$('#quiz-notifier').text('');
				$('#quiz-english').val('');
				$('#quiz-POS').text(res.POS);
				$('#quiz-chinese').text(res.chinese);
				$('#quiz-remain').text(res.remain);
				$('#quiz-submit')
					.text('submit')
					.off('click')
					.click(quizButton1);
			}else{
				$('#quiz-notifier')
					.removeClass('gray green')
					.addClass('red')
					.text('some error occurs');
			}
		});
		$('#quiz-notifier')
			.removeClass('red green')
			.addClass('gray')
			.text('wait please...');
	};

});