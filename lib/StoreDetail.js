module.exports = exports = nano = function(db){
	var Convert = require('./Helper.js').ConvertRecord;
	var Auth = require('./Helper.js').Auth;
	var tableName = "StoreDetail";
	var api = {
		Create : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var accountParam = {
				TableName: tableName,
				Item:{
					storeid:{'N':params.storeid.toString()},
					name : {'S':params.name},
					address:{'S':params.address},
					number:{'S':params.number},
					image:{'S':params.image},
					detail:{'S':params.detail}
				}
			}
			db.putItem(accountParam, function(error, data){
				if (error) return next(error);
				return next(null, data);
			});
		},
		Get : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName : tableName,
				Select : 'ALL_ATTRIBUTES',
				KeyConditions : {
					storeid:{
						AttributeValueList : [{'N':params.storeid}],
						ComparisonOperator : 'EQ'
					},
					name:{
						AttributeValueList : [{'S':params.name}],
						ComparisonOperator : 'EQ'
					}
				},
			}
			db.query(param, function(err, data){
				if(err) 
					return next(err);
				var result = Convert(data.Items[0]);
				next(null, result);
			});
		},
		Update : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var storeParam = {
				TableName: tableName,
				Key : {
					storeid :{N:params.storeid.toString()},
					name : {S:params.name}
				},
				AttributeUpdates:{
					address:{
						Action : 'PUT',
						Value : {S:params.address}
					},
					number:{
						Action: 'PUT',
						Value: {S:params.number}
					},
					image:{
						Action: 'PUT',
						Value: {S:params.image}
					},
					detail:{
						Action: 'PUT',
						Value: {S:params.detail}
					},
				}
			}
			db.updateItem(storeParam, function(error, data){
				if (error){
					return next(error);
				}
				return next(null, data);		
			});
		},
		List : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName : tableName,
				Select : 'ALL_ATTRIBUTES',
				KeyConditions : {
					storeid:{
						AttributeValueList : [{'N':params.storeid}],
						ComparisonOperator : 'EQ'
					}
				},
			}
			db.query(param, function(err, data){
				if(err) 
					return next(err);
				var result = [];
				data.Items.forEach(function(obj){
					result.push(Convert(obj));
				});
				next(null, result);
			});
		},
	}
	return api;
}
