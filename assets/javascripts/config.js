var tunisiana = {
    version: '1.1.3',
    date: '2014.avril.22',
    debug: true,
	currentFrame: 1,
	consolelog: {
        css: 'background: #FFF; color: #E3001B'
    },
	log: function(msg,notcustom) {
        if (this.debug && !$.browser.msie){
			if(!notcustom)
	            console.log('%c LOG : ', this.consolelog.css, msg);
			else
				console.log(msg);
		}
    },
	grid : [50 ,50],
	timer : 30
};