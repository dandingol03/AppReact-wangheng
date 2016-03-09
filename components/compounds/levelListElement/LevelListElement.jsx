import React from 'react';
import LiElement from '../../basic/LiElement.jsx';

import '../../../css/components/compounds/LevelListElement/LevelListElement.css';
/**
 * @property,explicit:required: data
 *
 *
 */
var LevelListElement=React.createClass({
    liCb:function(evt){
        var target=evt.target;
        var index=$(target).attr("data-index");//二维数组下标
        var pos=$(target).attr("data-pos");//一维数组下标
        if($(target).hasClass("first"))
        {
            if($(target).find("span").hasClass("glyphicon-menu-down"))
            {
                $(target).find("span.glyphicon").removeClass("glyphicon-menu-down");
                $(target).find("span.glyphicon").addClass("glyphicon-menu-up");
                $(target).next(".embed-div").slideDown();
            }else{
                $(target).find("span.glyphicon").addClass("glyphicon-menu-down");
                $(target).find("span.glyphicon").removeClass("glyphicon-menu-up");
                $(target).next(".embed-div").slideUp();
            }
        }

    },
    getInitialState:function() {

        var data;
        if(this.props.data!==null&&this.props.data!==undefined)
        data=this.props.data;
        var level;
        if(this.props["data-options"]!==null&&this.props["data-options"]!==undefined)
        {
            var options=this.props["data-options"];
            if(options.level!==undefined&&options.level!==null&&!isNaN(parseInt(options.level)))
            {
                level=parseInt(options.level);
            }
        }

        return {data:data,level:level};
    },
    render:function(){
        var noneStyle={display:"none"};
        var li$items;
        if(this.state.data!==undefined&&this.state.data!==null)
        {
            if(this.state.level==2)
            {
                var key=0;
                li$items=new Array();
                var liCb=this.liCb;
                //二维列表的第一层循环
                this.state.data.map(function(first,i) {
                    var expand;
                    var embed=new Array();
                    //二维列表的第二层循环
                    first.map(function(second,j) {
                        if(j==0)
                        {
                            //决定子列表询是否可见,expand==true表示可见
                            if(second.expand===true)
                                expand=true;
                            else
                                expand=false;
                            li$items.push(
                                <LiElement  className={"list-group-item first "}
                                              data-pos={i} data-index={j}
                                              clickCb={liCb} key={key}
                                    head={true} expand={expand}>
                                    {second.content}</LiElement>);
                        }else{
                                embed.push( <LiElement
                                    className={"list-group-item second"}
                                    data-pos={i} data-index={j}
                                    clickCb={liCb} key={key}>
                                    {second.content}</LiElement>);
                                if(j==first.length-1)//列表循环至某行最后一项
                                {
                                    if(expand==false)
                                    {
                                        li$items.push(<div className="embed-div" style={noneStyle} key={key}>
                                            {embed}
                                        </div>);
                                    }
                                    else{
                                        li$items.push(<div className="embed-div" key={key}>
                                            {embed}
                                        </div>);
                                    }
                                }

                        }
                        key++;
                    });

                })
            }
        }

        var components;

        return (
            <div className="list-group" align="center" >
                {li$items}
                {components}
            </div>)

    }

});

export default LevelListElement;