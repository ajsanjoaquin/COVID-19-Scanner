import React, { Component } from 'react'
import { Link } from "react-router-dom";

import {connect} from 'react-redux';

class Header extends Component {
    state  = {
        hidden: false,
        
    }

    render() {
        return (
            <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6 lg:" >
                <Link to ='/'><span class="font-semibold text-xl text-white mr-6 tracking-tight">COVID X-Ray Triage Assistant</span></Link>
                
                <div class="text-sm flex items-center justify-center" >
                
                <Link class="items-center block lg:inline-block lg:mt-0 text-teal-200 py-2 px-4  hover:text-white mr-4" to ='/'>
                    Home
                </Link>
                <Link class="items-center block lg:inline-block lg:mt-0 text-teal-200 py-2 px-4  hover:text-white mr-4" to ='/past'>
                    Past Results
                </Link>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state =>{
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(Header);