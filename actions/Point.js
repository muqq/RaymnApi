exports.CreatePoints = {
	name: 'CreatePoints',
	description: 'Create customer points in Point table using store app',
	version:1.0,
	inputs:{
		required: ['storeid','customerid','points'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			storeid : connection.params.storeid,
			customerid : connection.params.customerid,
			points : connection.params.points,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.point.Create(params, function(error, result){
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
exports.GetPoints = {
	name: 'GetPoints',
	description: 'Get customer points in Point table using in client and store',
	version:1.0,
	inputs:{
		required: ['storeid','customerid'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			storeid : connection.params.storeid,
			customerid : connection.params.customerid,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.point.Get(params, function(error, result){
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
exports.UpdatePoints = {
	name: 'UpdatePoints',
	description: 'Update customer points in Point table using in and store',
	version:1.0,
	inputs:{
		required: ['storeid','customerid','points'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			storeid : connection.params.storeid,
			customerid : connection.params.customerid,
			points : connection.params.points,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.point.Update(params, function(error, result){
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
exports.ListPoints = {
	name: 'ListPoints',
	description: 'List customer points in Point table using in client app',
	version:1.0,
	inputs:{
		required: ['customerid'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			customerid : connection.params.customerid,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.point.List(params, function(error, result){
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
