import React from 'react';
import Table from '../../forms/Table.jsx';


/**
 * @api,
 */
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
                success: function(ob) {
                    var data=ob.array;
                    var group=ob.group;
                    var op=ob.op;
                    var title=ob.title;
                    var title$index=ob.title$index;
                    var tags=this.state.tags;

                    if(data!==undefined&&data!==null) {
                        var dataS = new Array();
                        data.map(function (item, i) {
                            dataS.push(item);
                        });
                        if (group !== undefined && group !== null) {
                            data.map(function (item, i) {
                                tags[i]["data-options"].group = group;
                            });
                        }
                        //契约选项的更新
                        if (op !== undefined && op !== null) {
                            op.map(function (item, i) {
                                tags[item.index]["data-options"].op = item;
                            })
                        }
                        if (title !== undefined && title !== null && !isNaN(parseInt(title$index)))
                        {
                            tags[parseInt(title$index)]["data-options"].title=title;
                        }
                        //suck
                        this.setProps({dataS: dataS,tags:tags});
                        this.setState({initialDataS:true});
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
        //u can put data[] in this setting when component first be rendered
        var tags;
        //property dataS
        var dataS;
        //dataS initial status
        var initialDataS;
        if(this.props.tags!==undefined&&this.props.tags!==null)
        {

            tags = this.props.tags;


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
        return {tags:tags,dataS:dataS,initialDataS:initialDataS,data$options:data$options};
    },
   render:function(){


       var width="100%";
       var divRowStyle = {
           marginTop: 20
       };
       var containerStyle={textAlign:"center"};

       var tags=null;


       if(this.state.initialDataS===true)
       {
           if(this.state.tags!==undefined&&this.state.tags!==null) {
               var notifyCb=this.notifyCb;
               var tags=this.state.tags;
               //this loop based in dataS,so if u want to reset data in tabls
               //u can dynamiclly set dataS through setState method
               var initial$dataS=this.initialDatas;
               var tables=this.state.dataS.map(function(item,i) {
                   //fetch data-options of each table
                   var data$options=tags[i]["data-options"];
                   //fetch data of each data
                   var data=item;
                   return (<Table tdBasic={true} multiEnable={1} key={i} index={i}
                                  width={width} center={true}
                                  data-options={data$options} data={data} align="left" title-color="transparent"
                                  title-font-color="#fff" notifyCb={notifyCb}
                                  initialDatas={initial$dataS}
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
              {tables}
          </div>
      </div>) ;
   }
});

export default CoupleTableElement;