exports.CreateStoreDetail = {
	name: 'CreateStoreDetail',
	description: 'Create storedetail in storedetail table using CMS web',
	version:1.0,
	inputs:{
		required: ['storeid','name','address','number','image','detail'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			storeid : connection.params.storeid,
			name : connection.params.name,
			address : connection.params.address,
			number : connection.params.number,
			image : connection.params.image,
			detail : connection.params.detail,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.storeDetail.Create(params, function(error, result){
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

exports.GetStoreDetail = {
	name: 'GetStoreDetail',
	description: 'Get Store Detail in StoreDetail table using in client and store',
	version:1.0,
	inputs:{
		required: ['storeid','name'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			storeid : connection.params.storeid,
			name : connection.params.name,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.storeDetail.Get(params, function(error, result){
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

exports.UpdateStoreDetail = {
	name: 'UpdateStoreDetail',
	description: 'Update StoreDetail in StoreDetail table using in and store',
	version:1.0,
	inputs:{
		required: ['storeid','name','address','number','image','detail'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			storeid : connection.params.storeid,
			name : connection.params.name,
			address : connection.params.address,
			number : connection.params.number,
			image : connection.params.image,
			detail : connection.params.detail,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.storeDetail.Update(params, function(error, result){
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
exports.ListStoreDetails = {
	name: 'ListStoreDetails',
	description: 'List StoreDetails in StoreDetail table using in and store',
	version:1.0,
	inputs:{
		required: ['storeid'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			storeid : connection.params.storeid,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.storeDetail.List(params, function(error, result){
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
