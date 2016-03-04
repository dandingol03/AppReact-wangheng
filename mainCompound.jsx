

import React from 'react';
import {render} from 'react-dom';
import Table from './components/forms/Table.jsx';
import ListElement from './components/basic/ListElement.jsx';
import ButtonElement from './components/basic/ButtonElement.jsx';
import CoupleTableElement from './components/compounds/CoupleTableElement.jsx';


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
        url:"/gradms/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:'newCultivatePlanPage',
            reactActionName:'newPlanselectCourse'
        }
    }

    var data$options$1={
        checked:{
            url:"../../gradms/bsuims/reactPageDataRequest.do",
            params:{
                reactPageName:'newCultivatePlanPage',
                reactActionName:'selectCourseDelete'
            },
            name:"删除上表选择",
            conductInTable:true
        },group:{
            property:"类别"
        }

    }

    var data$options$2={
        checked:{
            url:"../../gradms/bsuims/reactPageDataRequest.do",
            params:{
                reactPageName:'newCultivatePlanPage',
                reactActionName:'selectCourseInsert'
            },
            name:"增加下表选择",
            conductInTable:true
        },
        group:{
            property:"类别"
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
        , document.getElementById('cultivatePlanJsx'));


}


