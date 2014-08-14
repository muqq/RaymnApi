module.exports = exports = nano = function(db){
	var Convert = require('./Helper.js').ConvertRecord;
	var Auth = require('./Helper.js').Auth;
	var tableName = "Point";
	var api = {
		Create : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
				var putParam = {
					TableName: tableName,
					Item:{
						storeid:{'N':params.storeid},
						customerid:{'S':params.customerid},
						points:{'N':params.points},
					},
				}
				db.putItem(putParam, function(error, data){
					if (error) return next(error);
					data.points = params.points ;
					next(null, data);
			});
		},
		Get : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName : tableName,
				Select : 'ALL_ATTRIBUTES',
				KeyConditions : {
					customerid:{
						AttributeValueList : [{'S':params.customerid}],
						ComparisonOperator : 'EQ'
					},
					storeid:{
						AttributeValueList : [{'N':params.storeid}],
						ComparisonOperator : 'EQ'
					}
				}
			}
			db.query(param, function(err, data){
				if(err) 
					return next(err);
				var result = Convert(data.Items[0]);
				result.Count = data.Count ;
				next(null, result);
			});
		},
		List : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName : tableName,
				Select : 'ALL_ATTRIBUTES',
				KeyConditions : {
					customerid:{
						AttributeValueList : [{'S':params.customerid}],
						ComparisonOperator : 'EQ'
					},
				}
			}
			db.query(param, function(err, data){
				if(err) 
					return next(err);
				var result = [] ;
				data.Items.forEach(function(obj){
					result.push(Convert(obj));
				});
				next(null, result);
			});
		},
		Update : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName: tableName,
				Key : {
					storeid :{N:params.storeid.toString()},
					customerid : {S:params.customerid}
				},
				AttributeUpdates:{
					points:{
						Action : 'PUT',
						Value : {N:params.points.toString()}
					}
				},
				ReturnValues: 'UPDATED_NEW'
			}
			db.updateItem(param, function(error, data){
				if (error){
					return next(error);
				}
				return next(null, Convert(data.Attributes));
			});
		}
	}
	return api;
}
