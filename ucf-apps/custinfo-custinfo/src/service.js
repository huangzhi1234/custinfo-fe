import request from "utils/request";
import { deepClone } from 'utils';

//定义接口地址
const URL = {
    "GET_cust_info": `${GROBAL_HTTP_CTX}` + `/custinfo/custinfo/list`, //通过search_id 查询列表详情
    "SAVE_cust_info": `${GROBAL_HTTP_CTX}` + `/custinfo/custinfo/insertSelective`, //添加
    "UPDATE_cust_info": `${GROBAL_HTTP_CTX}` + `/custinfo/custinfo/updateSelective`, //修改
    "DEL_cust_info": `${GROBAL_HTTP_CTX}` + `/custinfo/custinfo/deleteBatch`,
    "GET_LIST": `${GROBAL_HTTP_CTX}` + `/custinfo/custinfo/list`, //获取列表
    //行过滤
    "GET_LIST_BY_COL": `${GROBAL_HTTP_CTX}` + `/custinfo/custinfo/distinct`,
}


/**
 * 通过search_id 查询列表详情
 */
export const getcustinfo = (param) => {
    return request(URL.GET_cust_info, {
        method: "get",
        param
    });
}

/**
 * 删除table数据
 * @param {*} params
 */
export const deletecustinfo = (params) => {
    return request(URL.DEL_cust_info, {
        method: "post",
        data: params
    });
}

/**
 * 添加
 * @param {*} params
 */

export const savecustinfo = (params) => {
    return request(URL.SAVE_cust_info, {
        method: "post",
        data: params
    });
}

/**
 * 修改
 * @param {*} params
 */

export const updatecustinfo = (params) => {
    return request(URL.UPDATE_cust_info, {
        method: "post",
        data: params
    });
}

/**
 * 获取列表
 * @param {*} params
 */
export const getList = (param) => {
    let newParam = Object.assign({}, param),
        pageParams = deepClone(newParam.pageParams);

    delete newParam.pageParams;
    return request(URL.GET_LIST, {
        method: "post",
        data: param,
        param: pageParams
    });
}

/**
 * 获取行过滤的下拉数据
 *   @param {*} params
 */
export const getListByCol = (param) => {
    return request(URL.GET_LIST_BY_COL, {
        method: "post",
        data: param
    });
}