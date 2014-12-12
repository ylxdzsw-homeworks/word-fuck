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

	var quizButton1 = function(){};
	var quizButton2 = function(){};


});