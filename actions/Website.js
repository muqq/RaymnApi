var redis = require('redis'),
		client = redis.createClient();
exports.CreateNews = {
	name: 'CreateNews',
	description: 'Create News use in CMS web',
	version:1.0,
	inputs:{
		required: ['category','title','image','content','date'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			category : connection.params.category,
			title : connection.params.title,
			image : connection.params.image,
			content : connection.params.content,
			date : connection.params.date,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.website.Create(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				connection.response = result ;
				return next(connection, true);
			}
		});
	}
}
exports.GetNews = {
	name: 'GetNews',
	description: 'Get News use in CMS web and Official Web',
	version:1.0,
	inputs:{
		required: [],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.website.Get(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				connection.response = result ;
				return next(connection, true);
			}
		});
	}
}
exports.DeleteNews = {
	name: 'DeleteNews',
	description: 'Dlete News use in CMS web',
	version:1.0,
	inputs:{
		required: ['newsid'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			newsid : connection.params.newsid,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.website.Delete(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				connection.response = result ;
				return next(connection, true);
			}
		});
	}
}
exports.UpdateNews = {
	name: 'UpdateNews',
	description: 'Update News use in CMS web',
	version:1.0,
	inputs:{
		required: ['newsid','category','title','image','content','date'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			newsid : connection.params.newsid,
			category : connection.params.category,
			title : connection.params.title,
			image : connection.params.image,
			content : connection.params.content,
			date : connection.params.date,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.website.Update(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				connection.response = result ;
				return next(connection, true);
			}
		});
	}
}
exports.SessionCheck = {
	name: 'SessionCheck',
	description: '',
	version:1.0,
	inputs:{
		required: [],
		optional:[],
	},
	run: function(api, connection, next){
		var sessionId = connection.rawConnection.req.headers.cookie;
		sessionId = sessionId.replace('sessionID=','');
		client.get(sessionId, function(err, reply){
			if (err){
				connection.error = err ;
				return next(connection, true);
			}else {
				console.log('relply'+reply);
				if (reply) {
					connection.response = {status:'session exist'}
					return next(connection, true);
				}else {
					connection.response = {status:'no session'}
					return next(connection, true);
				}
			}
			client.quit();
		});
	}
}
exports.CMSLogin = {
	name: 'CMSLogin',
	description: '',
	version:1.0,
	inputs:{
		required: ['account','password'],
		optional:[],
	},
	run: function(api, connection, next){
		var sessionId = connection.rawConnection.req.headers.cookie;
		sessionId = sessionId.replace('sessionID=','');
		var params = {
			account : connection.params.account,
			password : connection.params.password,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.website.Login(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				if ((result[0].account === params.account)&&(result[0].password === params.password)) {
					client.set(sessionId , 'User', function(err ,res){
						if (err) {
							connection.error = err ;
							client.quit();
							return next(connection, true);
						}else{
							console.log(sessionId);
							client.pexpire(sessionId, 5000);
							client.quit();
							connection.response = {status:'Login success'}
							return next(connection, true);
						}
					});
				}else{
					connection.error = '帳密錯誤';
					return next(connection, true);
				}
			}
		});
	}
}
