import React from 'react';
import '../../build/bootstrap/css/sample/table.css';
var TdBasicElement=React.createClass({
    clickHandler:function(){
        this.props.clickHandler(this.props.tdData);
    },
    render:function(){
        var data=this.props.tdData;
        if(this.props.width!==undefined&&this.props.width!==null)
         return (<td rowSpan={this.props.rowSpan!==undefined&&this.props.rowSpan!==null?this.props.rowSpan:1} colSpan={1} width={this.props.width}
                onClick={this.clickHandler}>
             {data}
             </td>);
        else
        {
            return (<td rowSpan={this.props.rowSpan!==undefined&&this.props.rowSpan!==null?this.props.rowSpan:1} colSpan={1}
                        onClick={this.clickHandler} className="microsoft-font" >
                {data}
            </td>);
        }
    }
})
export default TdBasicElement;