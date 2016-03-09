import React from 'react';
import '../../css/components/forms/TdBasicElement/TdBasicElement.css';



var TdBasicElement=React.createClass({
    clickHandler:function(){
        this.props.clickHandler(this.props.tdData);
    },
    render:function(){
        var data=this.props.tdData;
        var groupStyle={verticalAlign:"middle"};
        if(this.props.width!==undefined&&this.props.width!==null)
        {
            if(this.props.updateFlag==true)
            {
                return (<td rowSpan={this.props.rowSpan!==undefined&&this.props.rowSpan!==null?this.props.rowSpan:1}
                            colSpan={1} width={this.props.width} className="un-render"
                            onClick={this.clickHandler} style={groupStyle}>
                    {data}
                </td>);
            }else{
                return (<td rowSpan={this.props.rowSpan!==undefined&&this.props.rowSpan!==null?this.props.rowSpan:1} colSpan={1} width={this.props.width}
                            onClick={this.clickHandler}>
                    {data}
                </td>);
            }
        }
        else
        {
            if(this.props.updateFlag==true)
            {
                return (<td  rowSpan={this.props.rowSpan!==undefined&&this.props.rowSpan!==null?this.props.rowSpan:1} colSpan={1}
                             onClick={this.clickHandler} className="microsoft-font un-render" style={groupStyle}>
                    {data}
                </td>);
            }else{
                return (<td  rowSpan={this.props.rowSpan!==undefined&&this.props.rowSpan!==null?this.props.rowSpan:1} colSpan={1}
                             onClick={this.clickHandler} className="microsoft-font" >
                    {data}
                </td>);
            }

        }
    }
})
export default TdBasicElement;