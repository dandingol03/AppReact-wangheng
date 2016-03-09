import React from 'react';
import '../../css/components/forms/TdOpElement/TdOpElement.css';
import ContractElement from '../contract/ContractElement.jsx';


var TdOpElement=React.createClass({
    checkHandle:function(){
        if(this.state.data!==undefined&&this.state.data!==null&&this.state.data.length>1)
        {
            this.setState({contractStatus:true});
        }
        else{
            this.props.opHandle(this.state.data);
        }
    },
    opHandle:function(ob){
        if(ob!==undefined&&ob!==null)
        {
            this.setState({contractStatus:false});
            this.props.opHandle(ob);
        }
        else
            this.setState({contractStatus:false});
    },
    getInitialState:function(){
        var data;
        var op;
        if(this.props.op!==undefined&&this.props.op!==null)
        {
            op=this.props.op;
            if(op.data!==undefined&&op.data!==null)
                data=op.data;
        }
        return {contractStatus:false,op:op,data:data};
    },
    render:function(){
        var op=this.state.op;
        if(op.trend!==undefined&&op.trend!==null)
        {
            var img$src;
            if(op.trend=="add")
               img$src="../bootstrap/img/icon/add_0.png";
            else
                img$src="../bootstrap/img/icon/delete_0.png";
            //契约组件初始化
            var contract;
            if(op.data!==undefined&&op.data!==null)
                contract=<ContractElement contract={op.data} type={op.type} opHandle={this.opHandle}/>

            //显示增加或者删除图标
            if(this.state.contractStatus==false)
            {
                return (<td  rowSpan={1} colSpan={1}
                             width={this.props.width!==undefined&&this.props.width!==null?this.props.width:null}
                             className="microsoft-font" >
                    <i><img src={img$src} onClick={this.checkHandle}/></i>
                </td>);
            }
            else{//显示Contract组件
                return (<td  rowSpan={1} colSpan={1}
                             width={this.props.width!==undefined&&this.props.width!==null?this.props.width:null}
                             className="microsoft-font" >
                    {contract}
                </td>);
            }

        }else{
           return( <td  rowSpan={1} colSpan={1}
                 width={this.props.width!==undefined&&this.props.width!==null?this.props.width:null}
                 onClick={this.opHandle} className="microsoft-font" >
                    </td>);

        }

    }

});

export default TdOpElement;