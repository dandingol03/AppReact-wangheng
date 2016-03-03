/**
 * Created by dandi_000 on 2016/2/23.
 */


import React from 'react';
import {render} from 'react-dom';
import Table from './components/forms/Table.jsx';
import ListElement from './components/basic/ListElement.jsx';
import ButtonElement from './components/basic/ButtonElement.jsx';

Boot()

function Boot()
{

        var data=[
     {'name':'wjj','age':18,'sex':'man'},
     {'name':'zyy','age':25,'sex':'woman'}
     ]
    var data$options$1={
        widths:["25%","25%","25%","25%"],
        components:[
            {
                name:"查询",type:"query",
                params:{
                    reactPageName:'newCultivateTeachSchedulePage',
                reactActionName:'reactGetTestData'
                },
                url:"gradms/bsuims/reactPageDataRequest.do"
            },
            {
                name:"年级",type:"dropdown",params:[
                {link:"www.baidu.com",title:"baidu"},
                {link:"www.sohu.com",title:"sohu"},
                {link:"www.kuaibo.com",title:"kuaibo"},
                {link:"www.shanda.com",title:"shanda"}]
            }],
        checked:{
            url:"gradms/bsuims/reactPageDataRequest.do",
            params:{
                reactPageName:'newCultivateTeachSchedulePage',
                reactActionName:'reactGetTestData'
            },
            name:"增加上表选择"
        }

    }

    var data$options$2={
        widths:["25%","25%","25%","25%"],
        components:[
            {
                name:"查询",type:"query",
                params:{
                    reactPageName:'newCultivateTeachSchedulePage',
                    reactActionName:'reactGetTestData'
                },
                url:"gradms/bsuims/reactPageDataRequest.do"
            },
            {
                name:"年级",type:"dropdown",params:[
                {link:"www.baidu.com",title:"baidu"},
                {link:"www.sohu.com",title:"sohu"},
                {link:"www.kuaibo.com",title:"kuaibo"},
                {link:"www.shanda.com",title:"shanda"}]
            }],
        checked:{
            url:"gradms/bsuims/reactPageDataRequest.do",
            params:{
                reactPageName:'newCultivateTeachSchedulePage',
                reactActionName:'reactGetTestData'
            },
            name:"增加下表选择"
        }

    }

    var width="600px";
    var divRowStyle = {
        marginTop: 20
    };

    var selectConfig={
        params:{
            reactPageName:'newCultivateTeachSchedulePage',
            reactActionName:'reactGetTestData'
        },
        url:"gradms/bsuims/reactPageDataRequest.do"
    };

    var containerStyle={textAlign:"center"};
    render(
        <div className="row" style={divRowStyle}>
            <div className="container" style={containerStyle} >
                <Table tdBasic={true} multiEnable={1} key={1}
                       width={width} center={true}
                       data-options={data$options$1} data={data} align="right" title-color="#968D8D"
                     title-font-color="#fff"/>
                <Table tdBasic={true} multiEnable={1} key={2}
                       width={width} center={true}
                       data-options={data$options$2} data={data} align="right" title-color="#968D8D"
                       title-font-color="#fff"/>
            </div>
        </div>
        , document.getElementById('root'));
    BootList();

}



function BootList(){
    function cancelCb(evt){
        console.log("cancel is back");
    }
    function applyCb(evt){
        console.log("apply is back");
    }
    var data_options={params:[
        " metro is good",
        "Dapibus ac facilisis in",
        "Morbi leo risus",
        "Porta ac consectetur ac",
        "Vestibulum at eros"
    ],
        components:[
            {
                name:"提交",type:"apply",
                params:{
                    reactPageName:'newCultivateTeachSchedulePage',
                    reactActionName:'reactGetTestData'
                },
                url:"gradms/bsuims/reactPageDataRequest.do",
                cb:applyCb
            },
            {
               name:"返回",type:"cancel",
                cb:cancelCb
            }
        ]
    }



    render(
        <ListElement data-options={data_options}/>
        ,document.getElementById("list-render")
    );
}




