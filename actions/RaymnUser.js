exports.GetUser = {
	name: 'GetUser',
	description: 'Get website founder',
	version:1.0,
	inputs:{
		required: [],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.raymnUser.Users(params, function(error, result){
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
