/**
 * Created by dandi_000 on 2016/2/25.
 */

import React from 'react';
import TrElement from './TrElement.jsx';
import ButtonElement from '../basic/ButtonElement.jsx';
import DropDownButtonElement from '../basic/DropDownButtonElement.jsx';
import ComboBox from  '../basic/ComboBox.jsx';

import '../../css/components/forms/Table/Table.css';



var Table=React.createClass({
    checkCb:function(ob) {
       console.log("select index="+ob);
        this.setState({checkedIndex:parseInt(ob)});
    },
    checkHandle:function() {
        var data=this.state.data;
        var checkedIndex=this.state.checkedIndex;
        if(checkedIndex!==undefined&&checkedIndex!==null&&checkedIndex>-1)
        {
            if(this.props.notifyCb!==undefined&&this.props.notifyCb!==null)
            {
                var ob={
                    content:data[checkedIndex],
                    method:'addHandle',
                    index:this.props.index,
                    checkedIndex:checkedIndex
                };
                if(this.state.checked.conductInTable!==undefined&&this.state.checked.conductInTable!==null
                &&this.state.checked.conductInTable===true)
                {
                    var record=data[checkedIndex];
                    var id=record["课程号"];
                    record=JSON.stringify(record);
                    console.log("id=" + id);
                    var params=this.state.checked.params;
                    params["id"]=id;
                    params["record"]=record;
                    $.ajax({
                        type: 'POST',
                        url: this.state.checked.url,
                        dataType: 'json',
                        data: params,
                        cache: false,
                        success: function(data) {
                            console.log();
                            console.log();
                            if(this.props.handle!==null&&this.props.handle!==undefined)
                                this.props.handle(data);
                        }.bind(this),
                        error: function(xhr, status, err) {
                            console.error(this.props.url, status, err.toString());
                        }
                    });
                }
                this.props.notifyCb(ob);
            }
        }
    },
    queryCallBack:function(ob){
        var data=ob.data;
        var titles=new Array();
        for(var field in ob.data[0])
        {
            titles.push(field);
        }

        var cols=titles.length;
        if(cols!==undefined&&cols!==null) {
            if(cols<1)
                cols=1;
        }
        else
            cols=1;
        this.setState({data:ob.data,cols:cols,titles:titles});
    },
    getInitialState:function() {
        //data optional,table component will be renderd when data first be injected if null
        var data = this.props.data;
        //1.columns（title，width，field,tdBasic) required data-option option
        //
        //2.columns
        //TODO:search for duplicate field

        //tdBasic是否单态
        var tdBasic = this.props.tdBasic;
        if (tdBasic === null || tdBasic === undefined || tdBasic === true)
            tdBasic = true;
        else
            tdBasic = false;
        //
        var multiEnable = this.props.multiEnable;
        if (multiEnable === undefined || multiEnable === null || multiEnable === false || isNaN(parseInt(multiEnable)))
            multiEnable = 1;


        //width,表格总长
        var width = this.props.width;
        if (width !== undefined && width !== null) {
            if (!isNaN(width))
                width += "px";
            var pattern = /px$/g;
            var perPattern=/%$/g;
            if (!pattern.test(width)&&!perPattern.test(width))
                throw "width invalid,you should pass a number or a string like .px";
        }

        //cell width customer
        var widths;
        //components list
        var components;
        //stripped style enable
        var stripped=false;
        //checkbox enable
        var checked;
        //checkedIndex ,this checkbox will be checked when first-render
        var checkedIndex;
        //group type
        var group;
        if(this.props["data-options"]!==null&&this.props["data-options"]!==undefined)
        {
            var options=this.props["data-options"];
            //widths fetch
            if(options.widths!==null&&options.widths!==undefined)
            {
                widths=options.widths;
            }
            //components fetch
            if(options.components!==null&&options!==undefined)
            {
                components=options.components;
            }
            //style stripped
            if(options.stripped!==null&&options.stripped!==undefined)
            {
                stripped=true;
            }
            //property checked,indicate where the table should be filled with checkbox
            if(options.checked!==null&&options.checked!==undefined) {
                checked=options.checked;
                if(options.checked.index!==undefined&&options.checked.index!==null&&!isNaN(parseInt(options.checked.index)))
                    checkedIndex=parseInt(options.checked.index);
                else
                    checkedIndex=-1;
            }
            //groupType options,rows would be groupd with groupType
            if(options.group!==null&&options.group!==undefined)
            {
                group=options.group;
            }
        }

        //cols should be changed since data injected every time
        var cols;
        var titles;
        if(this.props.data!==undefined&&this.props.data!==null&&this.props.data.length>0)
        {
            var injected=this.props.data;
             titles=new Array();
            for(var field in injected[0])
            {
                titles.push(field);
            }
            cols=titles.length;

        }
        else
            cols=1;

        var align;
        if(this.props.align!==undefined&&this.props.align!==null) {
            switch(this.props.align)
            {
                case "left":
                    align={textAlign:"left"};
                    break;
                case "right":
                    align={textAlign:"right"};
                    break;
                case "center":
                    align={textAlign:"center"};
                    break;
                default:
                    align=null;
                    break;
            }

        }

        //property title-color,indicate the color of th in tbody
        //1.we use '$' to replace - in string
        var title$color;
        if(this.props["title-color"]!==undefined&&this.props["title-color"]!==null) {
            title$color ={backgroundColor:this.props["title-color"]};
        }
        //property tr-color,indicate the color of td in tbody
        var tr$color;
        if(this.props["tr-color"]!==undefined&&this.props["tr-color"]!==null) {
            tr$color = this.props["tr-color"];
        }

        //property title-font-color ,indicate the color of font of th in tbody
        var title$font$color;
        if(this.props["title-font-color"]!==undefined&&this.props["title-font-color"]!==null) {
            title$font$color = {color: this.props["title-font-color"]};
        }

        var title;
        if(this.props.title!==undefined&&this.props.title!==null)
            title=this.props.title;

        return {
            width: width, widths:widths,cols:cols,components:components,
            multiEnable: multiEnable, tdBasic: tdBasic, data: data,titles:titles,
            align:align,title$color:title$color,tr$color:tr$color,title$font$color:title$font$color,
            stripped:stripped,checked:checked,title:title,
            checkedIndex:checkedIndex,group:group
        };
    },
    componentDidUpdate:function(ob){

    },
    render:function(){

        {/*css style width*/}
        var w;
        if(this.state.width!==undefined&&this.state.width!==null)
            w=this.state.width;
        var widthStyle;
        if(w!==undefined&&w!==null)
        {
            widthStyle={width:w }
        }else
            {
                widthStyle = {width: "100%"}
            }

        {/*css style center*/}
        var center;
        if(this.props.center===true)
        center=true;
        var centerStyle={
            textAlign: "center",
            marginLeft:"auto",
            marginRight:"auto"
        }


        var isLineNumberVisible=this.props.isLineNumberVisible
        if(isLineNumberVisible===undefined||isLineNumberVisible===null)
         isLineNumberVisible=false;
        else
         isLineNumberVisible=true;

        //tbody表头
        var titles;
        var ths;
        if(this.state.titles!==null&&this.state.titles!==undefined&&this.state.titles.length>0)
        {
            var group=this.state.group;
            titles=this.state.titles.map(function(item,i) {
                if(group!==undefined&&group!==null)
                {
                    if(group.property!==item)
                        return(<th key={i}>{item}</th>);
                }
                else
                    return(<th key={i}>{item}</th>);
            });
        }
        if(titles!==null&&titles!==undefined)
        {
            if(this.state.checked!==undefined&&this.state.checked!==null)
            {
                if(this.state.title$font$color!==undefined&&this.state.title$font$color!==null)
                {
                    if(this.state.title$color!==undefined&&this.state.title$color!==null)
                    {
                        if(this.state.group!==undefined&&this.state.group!==null)
                        {
                            ths=(<tr style={Object.assign(this.state.title$font$color,this.state.title$color)}>
                                <th>{this.state.group.property}</th><th>选择</th>{titles}</tr>);
                        }else{
                            ths=(<tr style={Object.assign(this.state.title$font$color,this.state.title$color)}>
                                <th>选择</th>{titles}</tr>);
                        }
                    }else{
                        if(this.state.group!==undefined&&this.state.group!==null)
                        {
                            ths=(<tr style={this.state.title$font$color}>
                               <th>{this.state.group.property}</th> <th>选择</th>{titles}</tr>);
                        }else{
                            ths=(<tr style={this.state.title$font$color}>
                                <th>选择</th>{titles}</tr>);
                        }
                    }
                }else{
                    if(this.state.title$font$color!==undefined&&this.state.title$font$color!==null)
                    {
                        if(this.state.group!==undefined&&this.state.group!==null)
                        {
                            ths=(<tr style={this.state.title$font$color}>
                                <th>{this.state.group.property}</th><th>选择</th>{titles}</tr>);
                        }else{
                            ths=(<tr style={this.state.title$font$color}>
                                <th>选择</th>{titles}</tr>);
                        }

                    }else{
                        if(this.state.group!==undefined&&this.state.group!==null)
                        {
                            ths=(<tr>
                                <th>{this.state.group.property}</th><th>选择</th>{titles}</tr>);
                        }else{
                            ths=(<tr>
                                <th>选择</th>{titles}</tr>);
                        }
                    }
                }
            }else{
                if(this.state.group!==undefined&&this.state.group!==null)
                {
                    ths=(<tr style={Object.assign(this.state.title$font$color,this.state.title$color)}>
                        <th>{this.state.group.property}</th>{titles}</tr>);
                }else{
                    ths=(<tr style={Object.assign(this.state.title$font$color,this.state.title$color)}>
                        {titles}</tr>);
                }
            }


        }



        if(isLineNumberVisible===true)
            titles.splice(0,0,"<th>#<th>");
        var multiEnable=this.state.multiEnable;
        var tdBasic=this.state.tdBasic;

        var widths=this.state.widths;


        //tr$color indicate the color in th in tbody
        var tr$color;
        //checked indicate whether checkbox should be placed in first column
        var checkedIndex;
        var checkCb;
        var checkButton;
        if(this.state.tr$color!==undefined&&this.state.tr$color!==null)
            tr$color=this.state.tr$color;
        if(this.state.checked!==undefined&&this.state.checked!==null)
        {
            checkedIndex=this.state.checkedIndex;
            checkCb=this.checkCb;
            checkButton=(<tr className="un-render"><td colSpan={this.state.cols+1}>
                <ButtonElement  type="button"
                                        buttonClass="btn btn-default" title={this.state.checked.name}
                                         handle={this.checkHandle}
                   />
            </td></tr>);
        }

        //group field
        var group;
        var groupTypes;
        var groupFields;
        if(this.state.group!==undefined&&this.state.group!==null)
        {

            groupTypes=new Array();
            groupFields=new Array();
            var property=this.state.group.property;
            this.state.data.map(function(item,i) {
                if($.inArray(item[property], groupTypes)==-1)//如果groupTypes未包含对应type
                {
                    groupTypes.push(item[property]);
                    var json={};
                    json["field"]=item[property];
                    json["count"]=1;
                    groupFields.push(json);
                }else{
                    groupFields.map(function(record,i){
                        if(record["field"]==item[property])
                        {
                            record["count"]++;
                        }
                    });
                }
            });
        }


        var rows;
        if(this.state.data!==undefined&&this.state.data!==null){
             var checked=this.state.checked;
             var data=this.state.data;
             if(groupTypes!==null&&groupTypes!==undefined&&groupTypes.length>0)
             {
                 var rowIndex=0;
                 rows=new Array();
                 var property=this.state.group.property;
                 var preField=null;


                 groupTypes.map(function(field,i) {
                     var updateFlag=false;

                     if(field!==preField)
                     {
                         updateFlag=true;
                         preField=field;
                     }
                     data.map(function(item,j) {
                         if(item[property]==field)
                         {
                             var rowSpan;
                             if(updateFlag==true)
                             {
                                 rowSpan=0;
                                 groupFields.map(function(record,k) {
                                     if(record["field"]==field)
                                         rowSpan=record["count"];
                                 });
                             }

                             if(checkedIndex!==undefined&&checkedIndex!==null&&checkedIndex>-1
                                 &&checkedIndex==rowIndex)
                             {
                                 rows.push(<TrElement tr-color={tr$color} tdBasic={tdBasic} rowData={item} rowIndex={rowIndex}
                                                    multiEnable={multiEnable} isLineNumberVisible={isLineNumberVisible}
                                                    widths={widths}  key={rowIndex}  checkCb={checkCb}  insertCheck={true}
                                                      checked={true} groupType={property} updateFlag={updateFlag}
                                     rowSpan={rowSpan}/>);
                             }else{
                                 if(checked!==undefined&&checked!==null)
                                 {
                                     rows.push(<TrElement tr-color={tr$color} tdBasic={tdBasic} rowData={item} rowIndex={rowIndex}
                                                        multiEnable={multiEnable} isLineNumberVisible={isLineNumberVisible}
                                                        widths={widths}  key={rowIndex} checkCb={checkCb}
                                                          insertCheck={true} groupType={property} updateFlag={updateFlag}
                                         rowSpan={rowSpan}/>);
                                 }
                                 else
                                 rows.push(<TrElement tr-color={tr$color} tdBasic={tdBasic} rowData={item} rowIndex={rowIndex}
                                                    multiEnable={multiEnable} isLineNumberVisible={isLineNumberVisible}
                                                    widths={widths} key={rowIndex} groupType={property}
                                                      updateFlag={updateFlag} rowSpan={rowSpan}/>);
                             }
                             updateFlag=false;
                             rowIndex++;
                         }
                     });

                });
             }else{
                 rows=this.state.data.map(function(item,i) {
                     if(checkedIndex!==undefined&&checkedIndex!==null&&checkedIndex>-1
                         &&checkedIndex==i)
                     {
                         return (<TrElement tr-color={tr$color} tdBasic={tdBasic} rowData={item} rowIndex={i}
                                            multiEnable={multiEnable} isLineNumberVisible={isLineNumberVisible}
                                            widths={widths}  key={i}  checkCb={checkCb}  insertCheck={true} checked={true}/>);
                     }else{
                         if(checked!==undefined&&checked!==null)
                         {
                             return (<TrElement tr-color={tr$color} tdBasic={tdBasic} rowData={item} rowIndex={i}
                                                multiEnable={multiEnable} isLineNumberVisible={isLineNumberVisible}
                                                widths={widths}  key={i} checkCb={checkCb} insertCheck={true}/>);
                         }
                         else
                         return (<TrElement tr-color={tr$color} tdBasic={tdBasic} rowData={item} rowIndex={i}
                                            multiEnable={multiEnable} isLineNumberVisible={isLineNumberVisible}
                                            widths={widths}  key={i}  />);
                     }

                 });
             }

        }
        else{
            rows=<TrElement tr-color={tr$color}  tdBasic={tdBasic}
                             multiEnable={multiEnable} isLineNumberVisible={isLineNumberVisible}
                             widths={widths}   checkCb={checkCb}/>
        }


        var querycb=this.queryCallBack;
        var components;
        if(this.state.components!==undefined&&this.state.components!==null)
        {
            components=this.state.components.map(function(item,i) {
                if (item.type == "query")//查询组件
                {
                    return (<ButtonElement  type="button"
                                            buttonClass="btn btn-default" title={item.name}
                                           query={item} handle={querycb} key={i}/>)
                }
                if(item.type=="dropdown")//下拉组件
                {
                    var name=item.name;
                   return(<DropDownButtonElement
                       title={name}
                       params={item.params} key={i}
                       />)
                }
            })
        }

        var th$head;
        if(this.state.checked!==undefined&&this.state.checked!==null)
        {
            th$head=( <tr>
                <th colSpan={this.state.cols+1}
                    style={this.state.align}>
                    {components}
                </th>
            </tr>);
        }
        else{
            th$head=( <tr>
                <th colSpan={this.state.cols}
                    style={this.state.align}>
                    {components}
                </th>
            </tr>);
        }

    var theadStyle={textAlign:"center"}
        //郑艳
        var title;
        if(this.state.title!==undefined&&this.state.title!==null) {
            title=this.state.title;
        }

        var cols;
        if(this.state.cols!==undefined&&this.state.cols!==null)
        cols=this.state.cols;
    return(
        <table className="table table-bordered center" style={Object.assign(centerStyle,widthStyle)}>
            <thead>
            <tr><th colSpan={this.state.checked!==undefined&&this.state.checked!==null?cols+1:cols} style={theadStyle}>
                {title}</th></tr>
            {th$head}
            </thead>
            <tbody>
            {ths}
            {rows}
            {checkButton}
            </tbody>
        </table>
    );
    }
});

export default Table