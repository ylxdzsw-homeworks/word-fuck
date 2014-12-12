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
			console.log(res);
		});
		$('#add-reset').click();
	});
});