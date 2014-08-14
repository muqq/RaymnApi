module.exports = exports = nano = function(db){
	var Convert = require('./Helper.js').ConvertRecord;
	var Auth = require('./Helper.js').Auth;
	var tableName = "Store";
	var api = {
		Create : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var indexParam = {
				TableName : 'Index',
				Key : {
					name : {S:'storeid'}
				},
				AttributeUpdates:{
					index:{
						Action: 'ADD',
						Value: {N:'1'}
					}
				},
				ReturnValues: 'ALL_NEW'
			}
			db.updateItem(indexParam, function(err, data){
				if(err) 
					return next(err);
				var newIndex = parseInt(data.Attributes.index.N);
				var accountParam = {
					TableName: 'StoreAccount',
					Item:{
						storeid:{'N':data.Attributes.index.N},
						password:{'S':params.password},
						account:{'S':params.account},
					}
				}
				db.putItem(accountParam, function(error, data){
					if (error) return next(error);
					var storeParam = {
						TableName: tableName,
						Item:{
							storeid:{'N':newIndex.toString()},
							name:{'S':params.name},
							category:{'S':params.category},
							icon:{'S':params.icon},
							discount:{'S':params.discount}
						}
					}
					db.putItem(storeParam, function(error, data){
						if(error) return next(error);
						next(null, data);
					});
				});
			});
		},
		List : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName : tableName
			}
			db.scan(param, function(error, data){
				if (error) return next(error);
				var result = [];
				data.Items.forEach(function(obj){
					result.push(Convert(obj));
				});
				next(null, result);
			});
		},
		ListAccount : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName : 'StoreAccount'
			}
			db.scan(param, function(error, data){
				if (error) return next(error);
				var result = [];
				data.Items.forEach(function(obj){
					result.push(Convert(obj));
				});
				next(null, result);
			});
		},
		Get : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName : 'StoreAccount',
				Select : 'ALL_ATTRIBUTES',
				KeyConditions : {
					account:{
						AttributeValueList : [{'S':params.account}],
						ComparisonOperator : 'EQ'
					},
					password:{
						AttributeValueList : [{'S':params.password}],
						ComparisonOperator : 'EQ'
					}
				},
				IndexName : 'Account'
			}
			db.query(param, function(err, data){
				if(err) 
					return next(err);
				var result = Convert(data.Items[0]);
				result.Count = data.Count ;
				next(null, result);
			});
		},
		GetStore : function(params, next){
			var param = {
				TableName : tableName,
				Select : 'ALL_ATTRIBUTES',
				KeyConditions : {
					storeid:{
						AttributeValueList : [{'N':params.toString()}],
						ComparisonOperator : 'EQ'
					}
				}
			}
			db.query(param, function(err, data){
				if (err) return next(err);
				var result = Convert(data.Items[0]);
				next(null, result);
			});
		},
		Update : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var storeParam = {
				TableName: tableName,
				Key : {
					storeid :{N:params.storeid.toString()}
				},
				AttributeUpdates:{
					name:{
						Action : 'PUT',
						Value : {S:params.name}
					},
					category:{
						Action: 'PUT',
						Value: {S:params.category}
					},
					icon:{
						Action: 'PUT',
						Value: {S:params.icon}
					},
					discount:{
						Action: 'PUT',
						Value: {S:params.discount}
					},
				}
			}
			db.updateItem(storeParam, function(error, data){
				if (error){
					return next(error);
				}
				var accountParam = {
					TableName: 'StoreAccount',
					Key :{
						storeid : {N:params.storeid.toString()}
					},
					AttributeUpdates:{
						account:{
							Action:'PUT',
							Value:{S:params.account}
						},
						password:{
							Action:'PUT',
							Value:{S:params.password}
						}
					}
				}
				db.updateItem(accountParam, function(error, data){
					if(error){
						return next(error);
					}
					return next(null, data);		
				});
			});
		}
	}
	return api ;
}
