import React from 'react';

/**
 *
 */
var LiElement=React.createClass({
    clickCb:function(evt){
        console.log();
        this.props.clickCb(evt);
    },
    render:function(){
        var span;
        var spanStyle={float:"right"};
        //head option can be optional
        if(this.props.head!==undefined&&this.props.head!==null)
        {
            if(this.props.head==true)
            {
                if(this.props.expand==true)
                {
                    span=<span className="glyphicon glyphicon-menu-up" style={spanStyle}
                               aria-hidden="true">
                    </span>
                }
                else{
                    span=<span className="glyphicon glyphicon-menu-down" style={spanStyle}
                               aria-hidden="true">
                    </span>
                }
            }
        }



        return(<li className={this.props.className} onClick={this.clickCb}
                   data-pos={this.props["data-pos"]} data-index={this.props["data-index"]}>
            {span}
            {this.props.children}
        </li>);

    }
});
export default LiElement;