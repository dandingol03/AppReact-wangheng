import React from 'react';
import Table from '../forms/Table.jsx';
import '../../css/components/compounds/CoupleTableElement/CoupleTableElement.css';

var CoupleTableElement=React.createClass({
    initialDatas:function(){
        if(this.state.data$options!==undefined&&this.state.data$options!==null)
        {
            var url=this.state.data$options.url;
            var params=this.state.data$options.params;
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                data: params,
                cache: false,
                success: function(data) {
                    if(data!==undefined&&data!==null)
                    {
                        var dataS=new Array();
                        data.array.map(function(item,i) {
                            dataS.push(item);
                        });
                        var titles=this.state.titles;
                        titles[0]=data.title;
                        this.setState({dataS:dataS,initialDataS:true,title:titles});
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    },
    addHandle:function(ob){
        if(this.state.dataS!==undefined&&this.state.dataS!==null)
        {
            var dataS=this.state.dataS;
            dataS.map(function(item,i){
                if(i!==ob.index)
                {
                    dataS[i].push(ob.record);
                }
                else{//删除所选表的记录
                    dataS[i].splice(ob.checkedIndex,1);
                }
            })
            this.setState({dataS:dataS});
        }


    },
    deleteHandle:function(ob){

    },
    notifyCb:function(ob) {
        //TODO:ob(content:{xxx:xxx},method:['addHandle','deleteHandle']}
        if(ob!==undefined&&ob!==null)
        {
            if(ob.index!==undefined&&ob.index!==null) {
                var methodName=ob.method;
                this[methodName]({record:ob.content,index:ob.index,
                checkedIndex:ob.checkedIndex});
            }
        }
    },
    getInitialState:function(){

        //property tags(name,data-options,data)
        var tags;
        var dataS;
        var initialDataS;
        var titles;
        if(this.props.tags!==undefined&&this.props.tags!==null)
        {

            tags = this.props.tags;

            titles=tags.map(function(item,i) {
                for(var field in item)
                {
                    if(field=="title")
                    return (item[field]);
                }
            })

            dataS=tags.map(function(item,i) {
                for(var field in item) {
                    if(field=="data")
                    {
                        return(item[field]);
                    }
                }
            });
            if(dataS!==undefined&&dataS!==null&&dataS.length>0&&dataS[0]!==undefined&&dataS[0]!==null)
                initialDataS=true;
            else
            {
                dataS=null;
            }
            var data$options;
            if(this.props["data-options"]!==undefined&&this.props["data-options"]!==null)
                data$options=this.props["data-options"];

        }
        return {tags:tags,dataS:dataS,initialDataS:initialDataS,data$options:data$options,
        titles:titles};
    },
   render:function(){


       var width="600px";
       var divRowStyle = {
           marginTop:0
       };
       var containerStyle={textAlign:"center"};

       var tags=null;


       if(this.state.initialDataS===true)
       {
           if(this.state.tags!==undefined&&this.state.tags!==null) {
               var notifyCb=this.notifyCb;
               var tags=this.state.tags;
               var titles=this.state.titles;
               tags=this.state.dataS.map(function(item,i) {
                   var data$options=tags[i]["data-options"];
                   var data=item;
                   var title;
                   if(titles!==undefined&&titles!==null&&titles[i]!==undefined&&titles[i]!==null)
                   title=titles[i]
                   return (<Table tdBasic={true} multiEnable={1} key={i} index={i}
                                  width={"100%"} center={true}
                                  data-options={data$options} data={data} align="right"
                                   notifyCb={notifyCb} title={title}
                       />)
               });

           }
       }
        else{
           this.initialDatas();
       }


      return(
          <div className="row" style={divRowStyle}>
          <div className="container" style={containerStyle} >
              {tags}
          </div>
      </div>) ;
   }
});

export default CoupleTableElement;