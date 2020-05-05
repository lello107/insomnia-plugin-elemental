	pippo = function(context, user = 'administrator', key = 'YjQkrni9YYz2baQ6t4dU', delay = 30, obj = 0, url='http://192.168.180.70/live_events/1756') {
		//var t = new Date();
		var t = moment().add(30, 'seconds').milliseconds(0)
		var expire = t.valueOf()// Math.floor(t.setSeconds(t.getSeconds() + 30).valueOf() / 1000);
	    //let hash = crypto.createHash('md5').update('some_string').digest("hex")
		let md51 = crypto.createHash('md5');
		let md52 = crypto.createHash('md5');
		//let xurl = url.parse("http://192.168.180.70/api/live_events").path;
		//xurl = xurl.path;
		const xurl = new URL(url).pathname;
		console.log(xurl);
		md51.update(String(xurl) + String(user) + String(key) + String(expire))
		//console.log(md51.digest("hex"));
		md52.update(String(key) + String(md51.digest("hex")));
	

		console.log(timeConverter(expire));
		console.log(expire);
		
		let obj_values = [md52.digest("hex"),expire]
		return obj_values[obj]
		

	}