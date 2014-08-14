module.exports = exports = nano = function(){
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'bbbb55952000@raymn.com.tw',
			pass: '2orijxai'
		}
	});
	var api = {
		Recieve : function(params, next){
			mailObject = {
				from: 'bbbb55952000@raymn.com.tw',
				to : 'bbbb55952000@raymn.com.tw',
				subject: params.title,
				text: 'Name:'+params.name + '\r\rEmail:'+params.email + '\r\rcontent:'+params.content 
			}
			transporter.sendMail(mailObject, function(err, data){
				if (err) next(err);
				else next(null, data);
			});
		}
	}
	return api ;
}
