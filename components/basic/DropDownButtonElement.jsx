import React from 'react';
import ButtonElement from './ButtonElement.jsx';
import MenuLinkElement from './MenuLinkElement.jsx';
import TodoStore from '../_event/TodoStore.js';


/**
 * @property,explicit:required: title{String}
 * @property,explicit:option:   data{link,title}
 * @property,explicit:option:   auto{false|undefined|null|xxx},
 * this prop will forbid component get menu from server-end if this prop is set to true;
 * u can set any-value  to enable dynamic menu-fetch;
 * @property,implicit:option:   query{params:xxx,url:xxx}
 * @property,implicit:option:   subscribe:{type:xxx,cb:xxx}
 * this prop component subscribe the message of the type you specified
 */

var DropDownButtonElement=React.createClass({
    initialData:function(){
        if(this.props.query!==undefined&&this.props.query!==null)
        {
            $.ajax({
                type: 'POST',
                url: this.props.query.url,
                dataType: 'json',
                data: this.props.query.params,
                cache: false,
                success: function(data) {
                    if(data!==undefined&&data!==null&&data.length>0)
                        this.setState({data:data,initialedData:true});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            });
        }
    }
    ,selectCb:function(ob){
        if(ob!==undefined&&ob!==null)
        {
            //selectedIndex indicate which menu you select
            if(ob.index!==null&&ob.index!==undefined)
                this.setState({selectedIndex:ob.index});
        }
    },
    getInitialState:function(){
        var data;
        if(this.props.data!==undefined&&this.props.data!==null)
            data=this.props.data;
        var auto;//enable dynamic data-fetch
        if(this.props.auto!==undefined&&this.props.auto!==null&&this.props.auto!==false)
            auto=true
        var initialedData;
        if(data!==undefined&&data!==null)
            initialedData=true;
        var subscribe;
        if(this.props.subscribe!==undefined&&this.props.subscribe!==null)
            subscribe=this.props.subscribe;
        var selectedIndex;
        if(this.props.selectedIndex!==undefined&&this.props.selectedIndex!==null)
            selectedIndex=this.props.selectedIndex;
        var id;
        if(this.props.id!==undefined&&this.props.id!==null)
            id=this.props.id;
        return {data:data,auto:auto,initialedData:initialedData,subscribe:subscribe
        ,selectedIndex:selectedIndex,id:id};
    },
    render:function(){
        var t_menu;
        if(this.state.initialedData===true)
        {
            var selectCb=this.selectCb;
             t_menu=this.state.data.map(function(item,i) {
                return(
                    <MenuLinkElement link={item.link} content={item.title} key={i} index={i} handle={selectCb}/>
                )
            })
        }else{
            if(this.state.auto===true)
            {
                this.initialData();
            }
        }

        var title;
        if(this.state.selectedIndex!==null&&this.state.selectedIndex!==undefined)
            title=this.state.data[this.state.selectedIndex]["title"];
        else
        {
            if(this.props.title!==undefined&&this.props.title!==null)
                title=this.props.title;
        }
        return( <div className="btn-group">
                <ButtonElement type="button" buttonClass="btn btn-default dropdown-toggle"
                            data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false" title={title} >
                    <span className="caret"></span>
                </ButtonElement>
                <ul className="dropdown-menu">
                     {t_menu}
                </ul>
            </div>)
   },
    componentDidMount:function(){
        //注册订阅
        if(this.state.subscribe!==undefined&&this.state.subscribe!==null)
        {
            var subscribe=this.state.subscribe;
            var instance=this;
            subscribe.map(function(item,i) {
                if(item['type']!==undefined&&item['type']!==null) {
                    TodoStore.addChangeListener(item['type'],item['callback'].bind(instance));
                }
            });
        }
    },
    componentWillUnmount:function()
    {
        //销毁订阅
        if(this.state.subscribe!==undefined&&this.state.subscribe!==null) {
            var subscribe=this.state.subscribe;
            subscribe.map(function(item,i) {
                if(item['type']!==undefined&&item['type']!==null) {
                    TodoStore.removeChangeListener(item['type'],item['callback']);
                }
            });
        }
    }
});

export default DropDownButtonElement