/**
 * Created by meteor on 2014/11/26.
 */
/**
 * Created by meteor on 14-8-20.
 */
var log4js = require('./lib/log4js');
var fs = require("fs-extra"); var path=require('path');
var async = require("async")
    ,streams3=require('readable-stream')
    ,_=require('underscore')
    ,semver=require('semver');
function isundefined(data){
    if(typeof(data) ==="undefined") return true;else return false;
}
function isArray(data) {
    if(isundefined(data)) return false;
    if((data instanceof Array)&& Array === data.constructor) return true;else return false;
}
function isJonsObject(data) {
    if(isundefined(data)) return false;
    if(typeof data!=='object'||isArray(data)) return false;else return true;
}
function getDatelogfilename(){
    var ndate = new Date();   var year = ndate.getFullYear(); //getFullYear getYear
    var month = ndate.getMonth() + 1;  if (month < 10) month = "0" + month;
    return year + '' + month;
}
function getDateStr(){
    var date =  new Date().getDate();
    if (date < 10) date = "0" + date;
    return  date.toString();
}
function getlogsFilePath(module_name){
    var logsFilePath = __dirname.substring(0, __dirname.lastIndexOf('config'));
    var datelogfilename =getDatelogfilename();
    logsFilePath=path.join(logsFilePath,'logs');
    logsFilePath=path.join(logsFilePath,datelogfilename);
    logsFilePath=path.join(logsFilePath,getDateStr());
    logsFilePath=path.join(logsFilePath,module_name.toString());
    logsFilePath= path.join(logsFilePath,'/');
    return logsFilePath;
};
var DateStr="";
var Tloger={};
function  initLog4js(module_name,initLog4jscb){
    async.waterfall([
        function(cb){
            var logsFilePath = path.join(__dirname,'..','..');
            var configjsonpath = path.join(__dirname ,"log4js.json");
            var configjosnpathdata = JSON.parse(fs.readFileSync(configjsonpath, 'utf8') );
            var IsNowDate=false;
            var nDateStr=getDateStr();
            if(DateStr==nDateStr)IsNowDate=true;
            if(DateStr==""||DateStr!=nDateStr) DateStr=nDateStr;
            var logFilePath=path.join(logsFilePath,'logs',getDatelogfilename(),nDateStr,module_name,'/');
            for (var i = 1; i < configjosnpathdata.appenders.length; i++) {
                var item = configjosnpathdata.appenders[i];
                //item.pattern = module_name+'_' + item.pattern;
                item.filename = logFilePath;
                //item.category = module_name+item.category;
                configjosnpathdata.appenders[i] = item;
            }
            cb(null,configjosnpathdata,logFilePath,IsNowDate)
        },function(configjosnpathdata,logFilePath,IsNowDate,cb){
            fs.mkdirp(logFilePath,function(err){
                if(err) cb(err);
                else cb(null,configjosnpathdata,IsNowDate)
            });
        },function(configjosnpathdata,IsNowDate,cb){
            if(IsNowDate){
                cb(null,Tloger);
            }else {
                log4js.configure(configjosnpathdata);
                var loger={
                    logconsole :log4js.getLogger('console'),
                    logDebug : log4js.getLogger('logDebug'),
                    logInfo : log4js.getLogger('logInfo'),
                    logWarn : log4js.getLogger('logWarn'),
                    logError : log4js.getLogger('logError'),
                    logTrace : log4js.getLogger('logTrace'),
                    logFatal : log4js.getLogger('logFatal')
                };
                Tloger=loger;
                cb(null,loger);
            }

        }
    ],function(err,loger){
        if(err) initLog4jscb(err)
        else initLog4jscb(null,loger);
    });
}




function log4jsPack(module_name){
    this.module_name=module_name;
    this.init=function(initcb){
        initLog4js(this.module_name,function(err,loger) {
            initcb(err,loger);
        });
    };

}
function logger(module_name){
    //function init(){
    //    log4jsPack(module_name);
    //}
    //init();
    var log4js=new log4jsPack(module_name);
    function debug(funname, data){
        var todata="";
        if(isJonsObject(data)||isArray(data))  todata = "fun:[ " + funname + " ] " + JSON.stringify(data);
        else  todata = "fun:[ " + funname + " ] " + data;
        log4js.init(function(err,loger){
            if(!err){
                loger.logDebug.debug(todata);
            }
        });
        //log4js.console.debug(log4js.module_name,funname,data)
    }
    function info(funname, data){
        var todata="";
        if(isJonsObject(data)||isArray(data))  todata = "fun:[ " + funname + " ] " + JSON.stringify(data);
        else  todata = "fun:[ " + funname + " ] " + data;
        log4js.init(function(err,loger){
            if(!err){
                loger.logInfo.info(todata);
            }
        });
    }
    function warn(funname, data){
        var todata="";
        if(isJonsObject(data)||isArray(data))  todata = "fun:[ " + funname + " ] " + JSON.stringify(data);
        else  todata = "fun:[ " + funname + " ] " + data;
        log4js.init(function(err,loger){
            if(!err){
                loger.logWarn.warn(todata);
            }
        });
    }
    function error(funname, data){
        var todata="";
        if(isJonsObject(data)||isArray(data))  todata = "fun:[" + funname + "] " + JSON.stringify(data);
        else  todata = "fun:[" + funname + "] " + data;
        log4js.init(function(err,loger){
            if(!err){
                loger.logError.error(todata);
            }
        });
    }
    function trace(funname, data){
        var todata="";
        if(isJonsObject(data)||isArray(data))  todata = "fun:[ " + funname + " ] " + JSON.stringify(data);
        else  todata = "fun:[ " + funname + " ] " + data;
        log4js.init(function(err,loger){
            if(!err){
                loger.logTrace.trace(todata);
            }
        });
    }
    function fatal(funname, data){
        var todata="";
        if(isJonsObject(data)||isArray(data))  todata = "fun:[" + funname + "] " + JSON.stringify(data);
        else  todata = "fun:[" + funname + "] " + data;
        log4js.init(function(err,loger){
            if(!err){
                loger.logFatal.fatal(todata);
            }
        });
    }
    function console_debug(){
        var data= Array.prototype.slice.call(arguments).join(" ");
        log4js.init(function(err,loger){
            if(!err){
                loger.logconsole.debug(data);
                //loger.logconsole.debug.call(loger.logconsole.callee,arguments);
            }
        });
    }
    function console_warn(){
        var data= Array.prototype.slice.call(arguments).join(" ");
        log4js.init(function(err,loger){
            if(!err){
                loger.logconsole.warn(data);
            }
        });
    }
    function console_error(){
        var data= Array.prototype.slice.call(arguments).join(" ");
        log4js.init(function(err,loger){
            if(!err){
                loger.logconsole.error(data);
            }
        });
    }
    function console_trace(){
        var data= Array.prototype.slice.call(arguments).join(" ");
        log4js.init(function(err,loger){
            if(!err){
                loger.logconsole.trace(data);
            }
        });
    }
    function console_fatal(){
        var data= Array.prototype.slice.call(arguments).join(" ");
        log4js.init(function(err,loger){
            if(!err){
                loger.logconsole.fatal(data);
            }
        });
    }
    return {
        "debug": debug,
        "deb": debug,
        "info": info,
        "inf": info,
        "warn": warn,
        "war": warn,
        "error": error,
        "err": error,
        "trace": trace,
        "tra": trace,
        "fatal": fatal,
        "fat": fatal,
        "console":{
            "debug":console_debug,
            "warn":console_warn,
            "error":console_error,
            "trace":console_trace,
            "fatal": console_fatal
        },
        "con":{
            "debug":console_debug,
            "warn":console_warn,
            "error":console_error,
            "trace":console_trace,
            "fatal": console_fatal
        }
    };
}
//if(global.g==undefined||global.g==null){
//    global.g={};
//}
//global.g.PWlogo4js=logger;
//global.g.logger=g.PWlogo4js.logger;
//global.g.async=g.PWlogo4js.async;
//global.g.streams3=g.PWlogo4js.streams3;
//global.g._=g.PWlogo4js._;
//global.g.semver=g.PWlogo4js.semver;
module.exports={"async":async,
    "streams3":streams3,
    "_":_,
    "semver":semver,
    "logger":logger
};
module.exports.logger=logger;
var logs =logger('Module_nameXXXX');
logs.console.debug('sssssss debug',11);
//logs.console.warn('sssssss warn');
//logs.console.error('sssssss error');
//logs.console.trace('sssssss trace');
//logs.console.fatal('sssssss fatal');
//logs.debug('login','login-error conntext');
//logs.info('logininfo','info context');
//logs.warn('loginwarn','warn context');
//########################################################
