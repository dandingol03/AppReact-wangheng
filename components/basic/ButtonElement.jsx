import React from "react";
import TodoStore from '../_event/TodoStore.js';

var ButtonElement=React.createClass({
    feedbackCb:function(ob)
    {

        this.state.feedback.params[ob.id]=ob.content;
        var count=0;
        for(var item in this.state.feedback.params)
        {
            count++;
        }
        if(this.state.broadcastCount==count)
        {
            var feedback;
            this.queryHandle(this.state.feedback.params);
            this.state.feedback.params=new Array();
        }
    },
    clickCb:function(evt){
        if(this.state.publish!==undefined&&this.state.publish!==null)//优先处理订阅事件
        {
            if(this.state.publish.type==undefined||this.state.publish.type==null)
                throw "publish type undefined!";
            TodoStore.emit(this.state.publish.type);
        }else{
            if(this.props.query!==undefined&&this.props.query!==null)
            {
                if(this.props.query.params!==undefined&&this.props.query.params!==undefined)
                   this.queryHandle();
            }
            else{
                if(this.props.handle!==undefined&&this.props.handle!==null)
                    this.props.handle(evt);
            }
        }
    },
    queryHandle:function(ob){
        var query=this.props.query;
        if(ob!==undefined&&ob!==null)
            Object.assign(query.params,ob);
        console.log();
        $.ajax({
            type: 'POST',
            url: query.url,
            dataType: 'json',
            data: query.params,
            cache: false,
            success: function(data) {
                if(this.props.handle!==null&&this.props.handle!==undefined)
                    this.props.handle(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        });
    },
    getInitialState:function(){
        var subscribe;
        if(this.props.subscribe!==undefined&&this.props.subscribe!==null)
        subscribe=this.props.subscribe;

        var broadcastCount;
        var feedback;
        var publish;
        if(this.props.publish!==undefined&&this.props.publish!==null) {
            publish=this.props.publish;
            broadcastCount=this.props.publish.broadcastCount;
            feedback={}
            feedback["count"]=0;
            feedback["params"]={};
        }
        var arr;
        return  {subscribe:subscribe,publish:publish,broadcastCount:broadcastCount,
            feedback:feedback,arr:arr};
    },
    render:function(){
        var marginStyle={
            marginRight:"20px"
        };


        var buttonClass;
        if(this.props.buttonClass!==undefined&&this.props.buttonClass!==null)
        buttonClass=this.props.buttonClass;
        var title;
        if(this.props.title!==null&&this.props.title!==undefined)
            title=this.props.title;
        var data_toggle;
        if(this.props["data-toggle"]!==null&&this.props["data-toggle"]!==undefined)
        data_toggle=this.props["data-toggle"];
        var arial_hasPopup;
        if(this.props["aria-haspopup"]!==null&&this.props["aria-haspopup"]!==undefined)
        arial_hasPopup=this.props["aria-haspopup"];
        var  aria_expanded;
        if(this.props["aria-expanded"]!==null&&this.props["aria-expanded"]!==undefined)
            aria_expanded=this.props["aria-expanded"];
        return(
            <button type={this.props.type} className={buttonClass} onClick={this.clickCb}
                style={marginStyle} data-toggle={data_toggle} aria-expanded={aria_expanded}>
                {title}
                {this.props.children}
                </button>
        )
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
        //注册消息发布
        if(this.state.publish!==undefined&&this.state.publish!==null&&
        this.state.broadcastCount!==undefined&&this.state.broadcastCount!==null) {
            var publish=this.state.publish;
            TodoStore.addChangeListener(publish.feedback.type,this.feedbackCb);
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
        //销毁消息发布
        if(this.state.publish!==undefined&&this.state.publish!==null) {
            TodoStore.removeChangeListener('feedback',this.feedbackCb);
        }
    }
});

export default ButtonElement;