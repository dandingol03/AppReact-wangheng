import React from 'react';

var MenuLinkElement=React.createClass({
    clickCb:function(){
        if(this.props.handle!==undefined&&this.props.handle!==null)
            this.props.handle({content:this.props.content,index:this.state.index});
    },
    getInitialState:function(){
        var index;
        if(this.props.index!==undefined&&this.props.index!==null)
        index=this.props.index;

        return {index:index};
    },
    render:function(){
        return (<li>
            <a href={this.props.link} onClick={this.clickCb}>{this.props.content}</a>
        </li>);
    }
})

export default MenuLinkElement