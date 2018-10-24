$('.wy-menu-vertical > ul.current').prev().addClass('active');

$('.wy-menu-vertical > p.caption').on('click', function(e){
	e.preventDefault();
	$(this).toggleClass('active');
});