import React from 'react';



var LinkElement=React.createClass({
    clickCb:function(evt){
        console.log();
        this.props.clickCb(evt);
    },
    render:function(){
    //list-group-item
        var data$index;
        if(this.props["data-index"]!==null&&this.props["data-index"]!==undefined)
             data$index=this.props["data-index"];
        return (<a href="#"  className={this.props.linkClass} data-index={data$index} onClick={this.clickCb} blued>
            {this.props.children}</a>)
    }
});

export default LinkElement;