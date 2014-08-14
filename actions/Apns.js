exports.PointNotification = {
	name: 'PointNotification',
	description: 'Tell customer how many points using in merchant app',
	version:1.0,
	inputs:{
		required: ['name','customerid','points','changepoints'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			customerid : connection.params.customerid,
			points: connection.params.points,
			changepoints:connection.params.changepoints,
			name : connection.params.name,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.apns.Get(params, function(error, token){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
			params.token = token ;
			api.service.apns.Notice(params, function(error, result){
				if(error){
					connection.error = error ;
					return next(connection, true);
				}else{
					connection.response = result;
					return next(connection, true);
				}
			});
			}
		});
	}
}

exports.RegistToken = {
	name: 'RegistToken',
	description: 'RegistToken from client app',
	version:1.0,
	inputs:{
		required: ['customerid','token'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			customerid : connection.params.customerid,
			token: connection.params.token,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.apns.Regist(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				connection.response = result;
				return next(connection, true);
			}
		});
	}
}
