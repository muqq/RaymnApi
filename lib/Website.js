module.exports = exports = nano = function(db){
	var Convert = require('./Helper.js').ConvertRecord;
	var Auth = require('./Helper.js').Auth;
	var tableName = "WebsiteNews";
	var api = {
		Create : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var indexParam = {
				TableName : 'Index',
				Key : {
					name : {S:'newsid'}
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
				var newsParam = {
					TableName: tableName,
					Item:{
						newsid:{'N':data.Attributes.index.N},
						category:{'S':params.category},
						title:{'S':params.title},
						image:{'S':params.image},
						content:{'S':params.content},
						date : {'S':params.date}
					}
				}
				db.putItem(newsParam, function(error, data){
					if (error) return next(error);
					return next(null, data)
				});
			});
		},
		Get : function(params, next){
			//if(!Auth(params.auth)) return next('Auth error');
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
		Delete : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				Key:{
					newsid :{'N':params.newsid.toString()},
				},
				TableName : tableName
			}
			db.deleteItem(param, function(error, data){
				if (error) return next(error);
				next(null, 'Delete success');
			});
		},
		Update : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var storeParam = {
				TableName: tableName,
				Key : {
					newsid :{N:params.newsid.toString()}
				},
				AttributeUpdates:{
					title:{
						Action : 'PUT',
						Value : {S:params.title}
					},
					category:{
						Action: 'PUT',
						Value: {S:params.category}
					},
					image:{
						Action: 'PUT',
						Value: {S:params.image}
					},
					content:{
						Action: 'PUT',
						Value: {S:params.content}
					},
					date:{
						Action: 'PUT',
						Value: {S:params.date}
					}
				}
			}
			db.updateItem(storeParam, function(error, data){
				if (error)	return next(error);
				return next(null, 'Update success');
			});
		},
		Login : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName : 'CMSUser'
			}
			db.scan(param, function(error, data){
				if (error) return next(error);
				var result = [];
				data.Items.forEach(function(obj){
					result.push(Convert(obj));
				});
				next(null, result);
			});
		}
	}
	return api;
}
