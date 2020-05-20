import React, { Component } from 'react'
import {connect} from 'react-redux';
import {UserLogin} from '../actions'

class Login extends Component {
    
    render() {
        return (
            <div className = "flex flex-col items-center justify-center" style = {{marginTop: "50px"}}>
                <form>
                    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col" style = {{width: "70vw",maxWidth: "500px"}}>
                    <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" />
                    </div>
                    <div class="mb-6">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="Password" />
                    </div>
                    <button onClick = {this.submitUserDetails}type= "submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                    </button>
                    </div>
                    
                </form>
            </div>
            
        )
    }
}

export default Login;