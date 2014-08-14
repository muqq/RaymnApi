exports.CreateTradeRecord = {
	name: 'CreateTradeRecord',
	description: 'Create trading record in table using in apps',
	version:1.0,
	inputs:{
		required: ['customerid','storeid','tradetime','tradepoints','points'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			customerid : connection.params.customerid,
			storeid : connection.params.storeid,
			tradetime : connection.params.tradetime,
			tradepoints : connection.params.tradepoints,
			points : connection.params.points,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.tradeRecord.Create(params, function(error, result){
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
exports.GetTradeRecords = {
	name: 'GetTradeRecords',
	description: 'Get trading record in table using in apps',
	version:1.0,
	inputs:{
		required: ['customerid','storeid'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			customerid : connection.params.customerid,
			storeid : connection.params.storeid,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.tradeRecord.Get(params, function(error, result){
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
