module.exports = exports = nano = function(){
	var AWS = require('aws-sdk');
	AWS.config.loadFromPath('./config.json');
	var aws = {
		dynamodb : new AWS.DynamoDB(),
		s3 : new AWS.S3()
	}
	return aws ;
}
