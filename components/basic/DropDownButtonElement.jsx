import React from 'react';
import ButtonElement from './ButtonElement.jsx';
import MenuLinkElement from './MenuLinkElement.jsx';

/**
 * @property,title
 * @property,data{link,content}
 *
 */

var DropDownButtonElement=React.createClass({

    getInitialState:function(){
        var data=this.props.params
        if(data===undefined||data===null||data.length<1)
            throw "DropDown data is null";
        return {menus:data};
    },
    render:function(){

    var t_menu=this.state.menus.map(function(item,i) {
        return(
            <MenuLinkElement link={item.link} content={item.title} key={i}/>
        )
    })


    return( <div className="btn-group">
            <ButtonElement type="button" buttonClass="btn btn-default dropdown-toggle"
                        data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false" title={this.props.title}>
                <span className="caret"></span>
            </ButtonElement>
            <ul className="dropdown-menu">
                 {t_menu}
            </ul>
        </div>)



   }
});

export default DropDownButtonElement