import React, { Component } from 'react'
import { Link } from "react-router-dom";

import {connect} from 'react-redux';

class Header extends Component {
    state  = {
        hidden: false,
        
    }

    userLoginStatus(){
        console.log(this.props.user)
        if(this.props.user.hasOwnProperty("user")){
            
            return <p>Welcome, {this.props.user.name}</p>
        }
        return (
            <Link class="bg-transparent text-blue-dark font-semibold hover:text-white hover:bg-gray-400 py-2 px-4 border border-blue  rounded" to='/login'>
                    Login
                </Link>
        )
    }

    render() {
        return (
            <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6 lg:" >
                <Link to ='/'><span class="font-semibold text-xl text-white mr-6 tracking-tight">COVID X-Ray Predictor</span></Link>
                
                <div class="text-sm flex items-center justify-center" >
                
                <Link class="items-center block lg:inline-block lg:mt-0 text-teal-200 py-2 px-4  hover:text-white mr-4" to ='/'>
                    Home
                </Link>
                <Link class="items-center block lg:inline-block lg:mt-0 text-teal-200 py-2 px-4  hover:text-white mr-4" to ='/past'>
                    Past Results
                </Link>
                {this.userLoginStatus()}
                
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