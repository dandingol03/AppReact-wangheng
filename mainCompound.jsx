

import React from 'react';
import {render} from 'react-dom';
import Table from './components/forms/Table.jsx';
import ListElement from './components/basic/ListElement.jsx';
import ButtonElement from './components/basic/ButtonElement.jsx';
import CoupleTableElement from './components/compounds/coupleTable/CoupleTableElement.jsx';


Boot()

function Boot()
{

    function check$apply$1(ob){
        console.log("ob="+ob);
    }

    var check$apply$2=function(ob){
        console.log("ob="+ob);

    }

    var data1=[
        {'name':'wjj','age':18,'sex':'man'},
        {'name':'zyy','age':25,'sex':'woman'}
    ]
    var data2=[
        {'name':'wjj','age':18,'sex':'man'},
        {'name':'zyy','age':25,'sex':'woman'},
        {'name':'jb','age':23,'sex':'man'}
    ]
    var data$options={
        url:"gradms/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:'newCultivateTeachSchedulePage',
            reactActionName:'reactGetCoupleData'
        }
    }
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
            name:"增加上表选择",
        },group:{
            property:"isedit"
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
            name:"增加下表选择",
        },
        group:{
            property:"isedit"
        }
    }


/*    var tags=[{"data":data1,"data-options":data$options$1}
    ,{"data":data2,"data-options":data$options$2}];*/
    var tags=[
        {"data-options":data$options$1}
        ,{"data-options":data$options$2}
    ];
    var containerStyle={textAlign:"center"};
    render(
        <CoupleTableElement tags={tags} data-options={data$options}/>
        , document.getElementById('root'));


}


