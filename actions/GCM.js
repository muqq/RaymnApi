exports.GcmPointNotification = {
	name: 'GcmPointNotification',
	description: 'Tell customer how many points using in merchant app',
	version:1.0,
	inputs:{
		required: ['name','customerid','points','changepoints','icon'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			customerid : connection.params.customerid,
			points: connection.params.points,
			changepoints:connection.params.changepoints,
			name : connection.params.name,
			icon : connection.params.icon,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.gcm.Get(params, function(error, token){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
			params.token = token ;
			api.service.gcm.Notice(params, function(error, result){
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

exports.GcmRegistToken = {
	name: 'GcmRegistToken',
	description: 'GcmRegistToken from client app',
	version:1.0,
	inputs:{
		required: ['customerid','regId'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			customerid : connection.params.customerid,
			token: connection.params.regId,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.gcm.Regist(params, function(error, result){
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
