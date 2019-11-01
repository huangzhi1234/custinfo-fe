export function isMoment(obj){
    return typeof obj === 'object' && obj && obj.date && obj.format;
}

export function formatRefPath(refPath){
    if(!refPath || typeof refPath !== 'string'){
        return refPath;
    }
    if(refPath[0] === '/'){
        refPath = refPath.slice(1);
    }
    if(refPath[refPath.length-1] === '/'){
        refPath = refPath.slice(0,-1);
    }
    return refPath;
}

export function isRef(any){
    let str = String(any);
    return str.indexOf('refname') > -1 && str.indexOf('refpk') > -1 && str[0] == '{' && str[str.length-1] == '}';
}

export function isDate(any){
    return Object.prototype.toString.call(any) === '[object Date]';
}

export function isYear(any){
    return any._type === 'year' && isMoment(any);
}

export function handleRef(any){
    try{
        any = JSON.parse(any)['refpk'];
    }
    catch(err){
        console.log('handle ref error');
        console.log(err);
    }

    return any;
}

export function handleYear(any){
    any = any.format('YYYY');

    return any;
}

export function handleMoment(any){
    any = any.format('YYYY-MM-DD hh:mm:ss');

    return any;
}

export function handleEntity(entity){
    for(let p in entity){
        if(entity.hasOwnProperty(p)){
            let val = entity[p];
            if(val){
                if(isRef(val)){
                    entity[p] = handleRef(val);
                }
                else if(isYear(val)){
                    entity[p] = handleYear(val);
                }
                else if(isMoment(val)){
                    entity[p] = handleMoment(val);
                }
            }
        }
    }

    return entity;
}

/**
 * @description 根据页面视口区域高度计算表格高度，以确定什么时候出滚动条
 * @returns {Number} height表格内容区高度
 */
export function getHeight() {
    let clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight),
        scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    let showHeight = (clientHeight > scrollHeight) && clientHeight || scrollHeight;
    return showHeight;
}