import React from 'react';
import TdBasicElement from '../TdBasicElement.jsx';

/**
 * @property multiEnable
 * @property tdData
 */

var TdWrapper=React.createClass({
    clickHandler:function(ob){
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log("ob=" + ob);
    },
   render:function(){
       var multiEnable=this.props.multiEnable;
       if(multiEnable===1||multiEnable===false)
       {
           if(this.props.tdBasic===true)
           return (<TdBasicElement width={this.props.width}
               clickHandler={this.clickHandler} tdData={this.props.tdData} rowSpan={this.props.rowSpan}/>);
           else{
               return (<td></td>);
           }
       }
       else{
            return (<td></td>);
       }

   }
});
export default TdWrapper