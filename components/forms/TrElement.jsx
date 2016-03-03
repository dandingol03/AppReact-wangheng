import React from 'react';
import TdWrapper from './wrapper/TdWrapper.jsx';
import CheckBoxElement from '../basic/CheckBoxElement.jsx';
/**
 * @author,danding001
 * @property,rowData(*)
 * @property,rowIndex(typeof *===number)
 * @property,isLineNumberVisible(true|false)
 * @property,multiEnable(false|number)
 */
var TrElement =React.createClass({
    clickCb:function(evt){
        var target=evt.target;
        if(this.props.clickCb!==undefined&&this.props.clickCb!==null) {
            this.props.clickCb(this.props.rowIndex);
        }
    },
    render:function(){
        //TODO:urgent config un-support
        //1.var dw=React.createClass(className,classProps,child1,child2,...,childN)

        var isLineNumberVisible=this.props.isLineNumberVisible;
        var multiEnable=this.props.multiEnable;
        var tdBasic=this.props.tdBasic;
        var widths=this.props.widths;
        //indicate the group field
        var groupType;
        if(this.props.groupType!==undefined&&this.props.groupType!==null)
        {
            groupType=this.props.groupType;
        }

        var rowData=this.props.rowData;
        var tds;
        var tgroups;
        if(rowData!==null&&rowData!==undefined)
        {
            tds=new Array();
            if(groupType!==undefined&&groupType!==null)
                tgroups=new Array();
            var index=0;
            var rowSpan=0;
            if(this.props.rowSpan!==undefined&&this.props.rowSpan!==null&&this.props.rowSpan>=1)
                rowSpan=this.props.rowSpan;
            var updateFlag=this.props.updateFlag;
            for(var field in rowData)
            {
                var width=null;
                if(widths!==null&&widths!==undefined&&widths!==false&&index<widths.length)
                    width=widths[index];
                var item=rowData[field];
                if(item===false||item===true)
                    item=""+item;
                //exclude the group field
                if(groupType!==null&&groupType!==undefined&&groupType==field)
                {
                    if(updateFlag!==undefined&&updateFlag!==null&&updateFlag==true)
                    tgroups.push(<TdWrapper width={width} tdBasic={tdBasic}
                                               tdData={item} multiEnable={multiEnable} key={index++} rowSpan={rowSpan}/>);
                }
                else{
                    tds.push(<TdWrapper   width={width} tdBasic={tdBasic}
                                          tdData={item} multiEnable={multiEnable} key={index++}/>);
                }
            }
        }
        else{
           tds=(<TdWrapper  tdBasic={tdBasic}
                             multiEnable={multiEnable} />)
        }



        var tr$color;
        if(this.props["tr-color"]!==undefined&&this.props["tr-color"]!==null) {
            tr$color = {backgroundColor:this.props["tr-color"]};
        }
        if(isLineNumberVisible===true)
        {
            if(this.props.insertCheck===true)
            {
                if(this.props.groupType!==undefined&&this.props.groupType!==null)
                {
                    return (<tr  style={tr$color} >
                            {tgroups}
                        <td>
                            <CheckBoxElement data-index={this.props.rowIndex} checkCb={this.props.checkCb} checked={this.props.checked}/>
                        </td>
                        <td>{this.props.rowIndex}</td>
                        {tds}
                    </tr>);
                }else{
                    return (<tr  style={tr$color} >
                        <td>
                            <CheckBoxElement data-index={this.props.rowIndex} checkCb={this.props.checkCb} checked={this.props.checked}/>
                        </td>
                        <td>{this.props.rowIndex}</td>
                        {tds}
                    </tr>);
                }

            }
            else{
                if(this.props.groupType!==undefined&&this.props.groupType!==null)
                {
                    return (<tr  style={tr$color} >
                        {tgroups}
                        <td>{this.props.rowIndex}</td>
                        {tds}
                    </tr>);
                }else{
                    return (<tr  style={tr$color} >
                        <td>{this.props.rowIndex}</td>
                        {tds}
                    </tr>);
                }

            }

        }else{
            if(this.props.insertCheck===true)
            {
                if(this.props.groupType!==null&&this.props.groupType!==undefined)
                {
                    return (<tr style={tr$color} >
                        {tgroups}
                        <td>
                            <CheckBoxElement data-index={this.props.rowIndex} checkCb={this.props.checkCb} checked={this.props.checked}/>
                        </td>
                        {tds}
                    </tr>)
                }else{
                    return (<tr style={tr$color} >
                        <td>
                            <CheckBoxElement data-index={this.props.rowIndex} checkCb={this.props.checkCb} checked={this.props.checked}/>
                        </td>
                        {tds}
                    </tr>)
                }

            }
            else{
                return (<tr style={tr$color} >
                    {tgroups}
                    {tds}
                </tr>)
            }

        }

    }
});
export default TrElement