var PWlogo4js =require("./log4js").logger
var log =PWlogo4js("xxModuleName");
log.console.debug('sssssss');
log.console.warn('sssssss');
log.console.error('sssssss');
log.console.trace('sssssss');
log.console.fatal('sssssss');
log.debug('login','login-error conntext');
log.info('logininfo','info context');
log.warn('loginwarn','warn context');
log.error('loginerror','error context');
log.trace('logintrace','trace context');
log.fatal('loginfatal','fatal context');