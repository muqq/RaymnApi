module.exports = exports = nano = function(s3){
	var uuid = require('node-uuid');
	var fs = require('fs');
	api = {
		UploadImage : function(params, next){
	    var tempPath = params.filePath;
			var fileName = uuid.v4().replace(/-/g,'') + params.fileExtension;
			fs.readFile(tempPath, function(error, data){
				if (error){
					return next(error);
				}
				console.log(params);
				var putParams = {
					Bucket: 'muqq',
					Key:  params.s3Path + fileName,
					Body: data,
					ContentType: params.contentType,
					ACL: 'public-read'
				}
				s3.putObject(putParams, function(error){
					if(error){
						return next(error);
					}
					var resp = {
						category: params.s3Path,
						url: 'https://s3-ap-northeast-1.amazonaws.com/muqq/' + params.s3Path + fileName
					}
					return next(null, resp);
				});
			});
		}
	}
	return api;
}
