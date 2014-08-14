exports.service = function(api, next){
	var aws = require('../lib/aws.js')();
	var customer = require('../lib/Customer.js')(aws.dynamodb);
	var store = require('../lib/Store.js')(aws.dynamodb);
  var upload = require('../lib/Upload.js')(aws.s3);
	var point = require('../lib/Point.js')(aws.dynamodb);
	var tradeRecord = require('../lib/TradeRecord.js')(aws.dynamodb);
	var storeDetail = require('../lib/StoreDetail.js')(aws.dynamodb);
	var apns = require('../lib/Apns.js')(aws.dynamodb);
	var gcm = require('../lib/GCM.js')(aws.dynamodb);
	var mailer = require('../lib/mailer.js')();
	var raymnUser = require('../lib/RaymnUser.js')(aws.dynamodb);
	var website = require('../lib/Website.js')(aws.dynamodb);
	api.service = {
		customer: customer,
		store : store,
		upload : upload,
		point : point,
		tradeRecord : tradeRecord,
		storeDetail : storeDetail,
		apns : apns,
		gcm : gcm,
		mailer : mailer,
		raymnUser : raymnUser,
		website : website
	};
  next();
}
