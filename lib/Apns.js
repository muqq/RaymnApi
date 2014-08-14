module.exports = exports = nano = function(db){
	var Convert = require('./Helper.js').ConvertRecord;
	var Auth = require('./Helper.js').Auth;
	var tableName = "ApnsToken";
	var apns = require('apn');
	var api = {
		Regist : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
				var putParam = {
					TableName: tableName,
					Item:{
						customerid:{'S':params.customerid},
						token:{'S':params.token},
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
				}
			}
			db.query(param, function(err, data){
				if(err) 
					return next(err);

				next(null, data.Items[0].token.S);
			});
				
		},
		Notice : function(params, next){
			var token = "<" + params.token + ">" ;
			var service = new apns.connection({cert:'certUmesh.pem', key:'keyUmesh.pem', gateway:'gateway.sandbox.push.apple.com'});

			service.on('connected', function(){
				console.log("Connected");
			});

			service.on('transmitted', function(notification, device){
				console.log("Notification transmitted to:" + device.token.toString('hex'));
				next(null, "transmitted");
			});

			service.on('transmissionError', function(errCode, notification, device){
				console.error("Notification caused error: " + errCode + " for device ", device , notification);
			});

			service.on('timeout', function(){
				console.log("connection timeout");
				next("timeout");
			});

			service.on('disconnected', function(){
				console.log("Disconnected from APNS");
				next("disconnected");
			});

			service.on('socketError', console.error);
			function pushNotification(){
				var note = new apns.notification();
				note.setAlertText("您於" + params.name + "得到" + params.changepoints + "點，您目前有" + params.points + "點");
				note.badge = 1 ;
				console.log("您於" + params.name + "得到" + params.changepoints + "點，您目前有" + params.points + "點");
				note.sound = "ping.aiff";
				note.payload = {
					key1 : 'value1',
					key2 : 'value2'
				};
				service.pushNotification(note, token);
			}
			pushNotification();
		}
	}
	return api ;
}	
