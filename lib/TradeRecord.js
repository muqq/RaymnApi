module.exports = exports = nano = function(db){
	var Convert = require('./Helper.js').ConvertRecord;
	var Auth = require('./Helper.js').Auth;
	var tableName = "Transactionrecords";
	var api = {
		Create : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
				var putParam = {
					TableName: tableName,
					Item:{
						storeid:{'N':params.storeid},
						customerid:{'S':params.customerid},
						points:{'N':params.points},
						tradetime:{'N':params.tradetime},
						tradepoints:{'N':params.tradepoints}
					},
				}
				db.putItem(putParam, function(error, data){
					if (error) return next(error);
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
				},
				IndexName : 'Store'
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
	return api ;
}
