/**
 * Created by dandi_000 on 2016/2/23.
 */


import React from 'react';
import {render} from 'react-dom';
import  Compound from './components/_event/Compound.jsx';

var _EventTrigger=React.createClass({
   render:function(){
       return(
           <Compound/>
       );
   }


});
render(
    <_EventTrigger />, document.getElementById('root')
);