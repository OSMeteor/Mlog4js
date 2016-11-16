
 


### how to use
```
npm install mlog4js

```

```
var mlog4js =require("mlog4js").logger
var log =mlog4js("xxModuleName");
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
```

```
project RootPath
  rootpath/logs/yyyymm/dd/xxModuleName/debug[error][fatal][info][trace][warn].log
  eg rootproject/201511/20/xxModuleName/debug.log
  
```
### Update log

##### 2015-11-20  version 0.0.1
######## log4js for version 0.6.27  

