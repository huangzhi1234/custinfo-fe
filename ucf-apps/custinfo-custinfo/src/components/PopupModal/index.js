
import React, {Component} from "react";
import {actions} from "mirrorx";
import {Col, Row, Checkbox, FormControl, Label,Switch} from "tinper-bee";
import FormList from 'components/FormList';
import {getValidateFieldsTrim} from "utils";
import FormError from 'components/FormError';
import Select from 'bee-select';
import moment from "moment";
import InputNumber from "bee-input-number";
import DatePicker from 'bee-datepicker';
import SelectMonth from 'components/SelectMonth';
import PopDialog from 'components/Pop';
import RefCommon from 'components/RefCommon';
import PreCode from 'components/PreCode';
import Radio from 'bee-radio';
import {handleEntity} from 'utils/tools';
import zhCN from "rc-calendar/lib/locale/zh_CN";
import 'bee-datepicker/build/DatePicker.css';
import './index.less'

const FormItem = FormList.Item;
const {Option} = Select;
const {YearPicker} = DatePicker;
const format = "YYYY-MM-DD HH:mm:ss";
const formatYYYY = "YYYY";
let titleArr = ["新增", "修改", "详情"];

class PopupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {},
            btnFlag: 0,
            cancelFlag: false
        }
    }
    async componentWillReceiveProps(nextProps) {
        let _this = this;
        let {btnFlag, currentIndex} = this.props;
        let {btnFlag: nextBtnFlag, currentIndex: nextCurrentIndex, editModelVisible} = nextProps;
        // 判断是否 btnFlag新弹框状态  currentIndex当前选中行
        if (btnFlag !== nextBtnFlag || currentIndex !== nextCurrentIndex) {
            _this.props.form.resetFields();
            // 防止网络阻塞造成btnFlag显示不正常
            this.setState({btnFlag: nextBtnFlag});
            if (nextBtnFlag !== 0 && editModelVisible) {
                let {list} = this.props;
                let rowData = list[nextCurrentIndex] || {};
                this.setState({rowData});
            }
        }
    }
    /**
     * 关闭Modal
     */
    onCloseEdit = () => {
        this.setState({rowData: {}, btnFlag: 0});
        this.props.onCloseEdit();
    }
    /**
     * 提交表单信息
     */
    onSubmitEdit = () => {
        let _this = this;
        let {btnFlag}=_this.state;
        _this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);
            if (!err) {
                values = handleEntity(values);
                this.onCloseEdit();
                values.btnFlag=btnFlag; // 弹框状态标识
                
                let {rowData ={} } = this.state;
                values.id = rowData.id;
                values.ts = rowData.ts;
                actions.popupEditcustinfo.savecustinfo(values);
            }
        });
    }
    /**
     *
     * @description 底部按钮是否显示处理函数
     * @param {Number} btnFlag 为页面标识
     * @returns footer中的底部按钮
     */
    onHandleBtns = (btnFlag) => {
        let _this = this;
        let btns = [

            {
                label: '取消',
                fun: this.onCloseEdit,
                shape: 'border'
            },
            {
                label: '确定',
                fun: _this.onSubmitEdit,
                colors: 'primary'
            },
        ];

        if (btnFlag == 2) {
            btns = [];
        }
        return btns;
    }


    render() {
        const _this = this;
        let {form, editModelVisible} = _this.props;
        let {rowData, btnFlag} = _this.state;
        let {getFieldProps, getFieldError} = form;

        let btns = _this.onHandleBtns(btnFlag);

        return (
            <PopDialog show={editModelVisible}
                       title={titleArr[btnFlag]}
                       size='lg'
                       btns={btns}
                       autoFocus={false}
                       enforceFocus={false}
                       close={this.onCloseEdit}
                       className="single-table-pop-model" >
                    <FormList>
       <FormItem required label={"客户名称"} >

                <FormControl disabled={typeof btnFlag !== 'undefined' && btnFlag == 2
}
                  {
                    ...getFieldProps('cust_name', {
                        initialValue: (typeof rowData === 'undefined' || typeof rowData.cust_name === 'undefined') ? "" : String(rowData.cust_name)
 ,
                        validateTrigger: 'onBlur',
                        rules: [{
                            type:'string',required: true
 ,pattern:/\S+/ig, message: '请输入客户名称',
                        },
                        { max: 64, message: "超出最大长度" }
                        ],
                        onChange(value) {
if(typeof rowData !== 'undefined'){
    let tempRow = Object.assign({},rowData,{ cust_name: value });
    _this.setState({
        rowData:tempRow
    })
}
                        }
                    }
                    )}
                />
            <FormError errorMsg={getFieldError('cust_name')}/>
       </FormItem>
       <FormItem required label={"客户性别"} >

            <Select disabled={typeof btnFlag !== 'undefined' && btnFlag == 2
}
                {
                ...getFieldProps('cust_sex', {
                    initialValue: (typeof rowData === 'undefined' || typeof rowData.cust_sex === 'undefined') ? "" : String(rowData.cust_sex)
 ,
                    rules: [{
                        required: true
 , message: '请选择客户性别',
                    }],
                    onChange(value) {
if(typeof rowData !== 'undefined'){
    let tempRow = Object.assign({},rowData,{ cust_sex: value });
    _this.setState({
        rowData:tempRow
    })
}
                    }
                }
                )}>
                <Option value="">请选择</Option>
                    <Option value={ '0' }>男</Option>
                    <Option value={ '1' }>女</Option>
            </Select>
            <FormError errorMsg={getFieldError('cust_sex')}/>
       </FormItem>
       <FormItem  label={"联系方式"} >

                <FormControl disabled={typeof btnFlag !== 'undefined' && btnFlag == 2
}
                  {
                    ...getFieldProps('phone', {
                        initialValue: (typeof rowData === 'undefined' || typeof rowData.phone === 'undefined') ? "" : String(rowData.phone)
 ,
                        validateTrigger: 'onBlur',
                        rules: [{
                            type:'string',required: false
 ,pattern:/\S+/ig, message: '请输入联系方式',
                        },
                        { max: 64, message: "超出最大长度" }
                        ],
                        onChange(value) {
if(typeof rowData !== 'undefined'){
    let tempRow = Object.assign({},rowData,{ phone: value });
    _this.setState({
        rowData:tempRow
    })
}
                        }
                    }
                    )}
                />
            <FormError errorMsg={getFieldError('phone')}/>
       </FormItem>
                    </FormList>
            </PopDialog>
        )
    }
}

export default FormList.createForm()(PopupModal);
