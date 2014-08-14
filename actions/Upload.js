exports.UploadImage = {
	name: 'UploadImage',
	description: 'Upload Image from CMS',
	version:1.0,
	inputs:{
		required: ['s3Path','fileExtension','contentType'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			filePath      : connection.params.file.path,
			s3Path        : connection.params.s3Path,
			fileExtension : connection.params.fileExtension,
			contentType   : connection.params.contentType
		}
		api.service.upload.UploadImage(params, function(error, result){
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
