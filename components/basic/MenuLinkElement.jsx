import React from 'react';

var MenuLinkElement=React.createClass({

    render:function(){
        return (<li>
            <a href={this.props.link}>{this.props.content}</a>
        </li>);
    }
})

export default MenuLinkElement