/**
 * Created by dandi_000 on 2016/2/23.
 */
import React,{Component} from 'react';
import config from './data/json/config.json';
import './css/main.css';

import Table from './components/forms/Table.jsx';
class Greeter extends Component{
    render(){

        return(
            <div >
                <span>{config.greetText}</span>
                <Table/></div>
        );
    }
}
export default Greeter
