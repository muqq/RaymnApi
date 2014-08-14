module.exports = exports = nano = function(db){
	var Convert = require('./Helper.js').ConvertRecord;
	var Auth = require('./Helper.js').Auth;
	var uuid = require('node-uuid');
	var tableName = "Customer";
	var api = {
		Create : function(params, next){
			console.log(Auth(params.auth));
			if(!Auth(params.auth)) return next('Auth error');
			var indexParam = {
				TableName : 'Index',
				Key : {
					name : {S:'cusindex'}
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
				var newCusindex = parseInt(data.Attributes.index.N);
				var customerid = uuid.v4().replace(/-/g,'');
				var putParam = {
					TableName: tableName,
					Item:{
						cusindex:{'N':data.Attributes.index.N},
						customerid:{'S':customerid},
						email:{'S':params.email},
						password:{'S':params.password}
					}
				}
				db.putItem(putParam, function(error, data){
					if (error) return next(error);
					var result = {
						cusindex : newCusindex,
						customerid : customerid
					}
					next(null, result);
				});
			});
		},
		Get : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName : tableName,
				Select : 'ALL_ATTRIBUTES',
				KeyConditions : {
					email:{
						AttributeValueList : [{'S':params.email}],
						ComparisonOperator : 'EQ'
					}
				},
				IndexName : 'Account'
			}
			if(params.action ==='login'){
				param.KeyConditions.password = {
					AttributeValueList : [{'S':params.password}],
					ComparisonOperator : 'EQ'
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
		Update : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName: tableName,
				Key : {
					cusindex :{N:params.cusindex.toString()},
					customerid : {S:params.customerid}
				},
				AttributeUpdates:{
					email:{
						Action : 'PUT',
						Value : {S:params.email}
					},
					password:{
						Action: 'PUT',
						Value: {S:params.password}
					}
				}
			}
			db.updateItem(param, function(error, data){
				if (error){
					return next(error);
				}
				console.log(data);
				return next(null, data);
			});
		}
	}
	return api ;
}
