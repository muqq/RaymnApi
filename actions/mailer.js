exports.ContactUs = {
	name: 'ContactUs',
	description: 'Recieve mail from Raymn Website',
	version:1.0,
	inputs:{
		required: ['name','email','title','content'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			name : connection.params.name,
			content: connection.params.content,
			email: connection.params.email,
			title: connection.params.title,
			auth : connection.rawConnection.req.headers.authorization
		}
		api.service.mailer.Recieve(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				connection.response = result;
				return next(connection, true);
			}
		});
	}
}
