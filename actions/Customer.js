exports.CreateCustomer = {
	name: 'CreateCustomer',
	description: 'Create customer in customer table using in client app',
	version:1.0,
	inputs:{
		required: ['email','password'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			email : connection.params.email,
			password: connection.params.password,
			action:'create',
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.customer.Get(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				if(result.Count===1){
					var res = {
						customerid : "same email"
					}
					connection.response = res;
					return next(connection, true);
				}
				else{
					api.service.customer.Create(params, function(error, result){
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
		});
	}
}

exports.GetCustomer = {
	name: 'GetCustomer',
	description: 'Get customer in customer table using in client app',
	version:1.0,
	inputs:{
		required: ['email','password'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			email : connection.params.email,
			password: connection.params.password,
			action:'login',
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.customer.Get(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				if(result.Count===1) result.state = 'YES';
				else result.state = 'NO' ;
				connection.response = result;
				return next(connection, true);
			}
		});
	}
}
exports.UpdateCustomer = {
	name: 'UpdateCustomer',
	description: 'Update customer in customer table using in CMS',
	version:1.0,
	inputs:{
		required: ['cusindex','customerid','email','password'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			cusindex : connection.params.cusindex,
			customerid : connection.params.customerid,
			email : connection.params.email,
			password : connection.params.password,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.customer.Update(params, function(error, result){
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
