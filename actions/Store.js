exports.CreateStore = {
	name: 'CreateStore',
	description: 'Create Store in store table using in CMS web',
	version:1.0,
	inputs:{
		required: ['name','category','account','password','icon'],
		optional:['discount'],
	},
	run: function(api, connection, next){
		var params = {
			name : connection.params.name,
			category : connection.params.category,
			account : connection.params.account,
			password : connection.params.password,
			icon : connection.params.icon,
			discount : connection.params.discount,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.store.Get(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				if(result.Count===1){
					connection.error = 'Account name had been registered'	;
					return next (connection, true);
				}
				else {
					api.service.store.Create(params, function(error, result){
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
		});
	}
}
exports.ListStores = {
	name: 'ListStores',
	description: 'List stores in store table using in CMS web',
	version:1.0,
	inputs:{
		required: [],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.store.List(params, function(error, result){
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
exports.GetStore = {
	name: 'GetStore',
	description: 'Get store in store table using in store app',
	version:1.0,
	inputs:{
		required: ['account','password'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			account : connection.params.account,
			password : connection.params.password,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.store.Get(params, function(error, loginResult){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				if(loginResult.Count===1){
					api.service.store.GetStore(loginResult.storeid, function(error, result){
						if(error){
							connection.error = error ;
							return next(connection, true);
						}else{
							loginResult.name = result.name ;
							connection.response = loginResult ;
							return next(connection, true); 
						}
					});	
				} 
				else{
					result.state = 'NO';
					connection.response = result ;
					return next(connection, true);
				} 
			}
		});
	}
}
exports.ListStoresAccount = {
	name: 'ListStoresAccount',
	description: 'List stores in store table using in CMS web',
	version:1.0,
	inputs:{
		required: [],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.store.ListAccount(params, function(error, result){
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
exports.UpdateStore = {
	name: 'UpdateStore',
	description: 'Update Store in store table using in CMS web',
	version:1.0,
	inputs:{
		required: ['storeid','name','category','account','password','icon','discount'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			storeid: connection.params.storeid,
			name : connection.params.name,
			category : connection.params.category,
			account : connection.params.account,
			password : connection.params.password,
			icon : connection.params.icon,
			discount : connection.params.discount,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.store.Update(params, function(error, result){
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
