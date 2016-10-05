$('#sidebar').click(function(){
	if ($('#sidebar').css('width') === '280px') {
		$('#sidebar').velocity({width: '89px'});
		$('.pushedContent').velocity({position: 'relative', left: '0px'});
		$('#logoTop').velocity({left: '30px'});
		$('#logoFull').velocity({opacity: '0'});
		$('#logoTopImg').velocity({scale: '1', right: '0px', bottom: '0px'});
		// $('#navItemOne').velocity({left: '-140px'});
		$('#navItemTwo').velocity({left: '-140px'});
		$('#navItemThree').velocity({left: '-140px'});
		$('#navItemFour').velocity({left: '-140px'});
		$('#homePageSidebarText').velocity({rotateZ: '-90deg', top: '300px', right: '40px'})
	} else {
		$('#sidebar').velocity({width: '280px'});
		$('.pushedContent').velocity({position: 'relative', left: '100px'});
		$('#logoTop').velocity({left: '50px'});
		$('#logoFull').velocity({opacity: '1'});
		$('#logoTopImg').velocity({scale: '1.2', right: '1px', bottom: '4px'});
		// $('#navItemOne').velocity({left: '30px'}, {delay: 100});
		$('#navItemTwo').velocity({left: '30px'}, {delay: 200});
		$('#navItemThree').velocity({left: '30px'}, {delay: 300});
		$('#navItemFour').velocity({left: '30px'}, {delay: 400});
		$('#homePageSidebarText').velocity({rotateZ: '0deg', top: '223px', right: '19.5px', scale: '1.3'})
	}
});
