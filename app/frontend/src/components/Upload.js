import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

import {connect} from 'react-redux';
import {postRequest} from '../actions'


class Upload extends Component {
    state = {
        loading: false,
        file: []
    }

    handleFileUpload = (e) => {
        let filesUploaded = e.target.files
        this.setState({
            loading: true
        })
        this.props.postRequest(filesUploaded)
    }

    componentDidUpdate(){
        if(this.state.loading==true){
            this.setState({
                loading: false
            })
        }
    }   

    render() {
        if(this.state.loading){
            return(
                <div class="flex w-full h-screen items-center justify-center bg-grey-lighter">
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={150}
                    width={150}
                />
                </div>
            )
        }
        else{
            return (
                <div class="flex w-full h-screen items-center justify-center bg-grey-lighter">
                <button onChange = {this.handleFileUpload}>
                <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
                    
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">Upload your image</span>
                        <input type='file' multiple class="hidden" />
                    
                </label>
                </button>
            </div>
                )
        }
        
    }
}

const mapStateToProps = state =>{
    return {
        images: state.Image
    }
}

export default connect(mapStateToProps,{
    postRequest
})(Upload);