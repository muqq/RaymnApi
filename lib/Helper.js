var _ = require('lodash');
var crypto = require('crypto');
var s = "shaofusproutwilbermuqqwhitebrown";
exports.ConvertRecord = function(item){
  var result = {} ;
  for (var k in item){
    if(item[k].N){
      result[k] = parseInt(item[k].N);
    }
    else if (item[k].S){
      result[k] = item[k].S ;
    }
    else if (item[k].NS){
      result[k] = [];
      item[k].NS.forEach(function(n){
	result[k].push(parseInt(n));
      });
    }
    else if (item[k].SS){
      result[k] = item[k].SS ;
    }
    else{
      throw new Error('Cannot conver record with B/BS type');
    }
  }
  return result;
}
exports.CheckNumber = function(item){
  var re = /^[0-9]+$/;
  if(!re.test(item.toString())){
    return false ;
  }else{
    item = parseInt(item);
  }
  if(_.isNumber(item)){
    item = item.toString();
  if((item.indexOf('.') != -1))
    return false;
  }else{
    return false ;
  }
  return true; 
}
exports.Auth = function(item){
	var secret = crypto.createHash('md5').update(s).digest('hex');
	var a = new Buffer(secret).toString('base64');
	a = 'Basic '+a ;
	if (item === a) return true;
	else return false ;
}
