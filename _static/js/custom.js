$(function() {
	$('.wy-breadcrumbs-aside').append('<br /><a href="https://aviatrix.com/schedule-demo/">&raquo; Request Product Demo</a>');

	$('.wy-menu-vertical > ul.current').prev().addClass('active');

	$('.wy-menu-vertical > p.caption').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
	});
});