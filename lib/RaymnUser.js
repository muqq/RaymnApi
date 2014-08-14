module.exports = exports = nano = function(db){
	var Convert = require('./Helper.js').ConvertRecord;
	var tableName = 'WebsiteUser';
	var api = {
		Users : function(params, next){
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
		}
	}
	return api ;
}
