import React from 'react';



var LinkElement=React.createClass({
    clickCb:function(evt){
        this.props.clickCb(evt);
    },
    render:function(){
        var data$index;
        if(this.props["data-index"]!==null&&this.props["data-index"]!==undefined)
             data$index=this.props["data-index"];

        //link,上层组件传来的超链
        var link;
        if(this.props.link!==undefined&&this.props.link!==null)
            link=this.props.link;
        else
            link="javascript:void(0)";

        var alignStyle;
        if(this.props.align!==undefined&&this.props.align!==null)
            alignStyle={
                textAlign:this.props.align
            }
        return (<a href={link}  className={this.props.linkClass} data-index={data$index}
                   onClick={this.clickCb} style={alignStyle}>
            {this.props.children}</a>)
    }
});

export default LinkElement;