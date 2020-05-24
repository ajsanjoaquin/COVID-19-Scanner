import React, { Component } from 'react'
import {connect} from 'react-redux';
import { CSVLink } from "react-csv"

import TableRow from './TableRow';
const headers  = [
    { label: "Filename", key: "filename" },
    { label: "Patient ID", key: "patientId" },
    { label: "Patient Sex", key: "sex" },
    { label: "Patient Age", key: "Age" },
    { label: "View Position", key: "view" },
    { label: "Predicted Label", key: "Predicted Label" }
  ];


class Past extends Component {
    state = {
        images:this.props.images["prev_results"]
        .map(item=>{return {...item,display:true}}),
        age: null
    }


    covidFilter = (tag) => {
        const new_items = this.state.images.map(item=>{
            if(tag == "both"){
                if(item["Predicted Label"]=="covid" || item["Predicted Label"]=="opacity"){
                    return {
                        ...item,
                        display:true
                    }
                }
                else{
                    return{
                        ...item,
                        display:false
                    }
                }
            }
            if(tag == "all"){
                return {
                    ...item,
                    display:true
                }
            }
            else if (item["Predicted Label"]==tag){
                return {
                    ...item,
                    "display":true
                }
            }
            else{
                return {
                    ...item,
                    "display":false
                }
            }
        })
        this.setState({images:new_items})
    }

    viewFilter = (view) => {
        const new_items = this.state.images.map(item=>{
            if(view == "all"){
                return {
                    ...item,
                    display:true
                }
            }
            if (item.ViewPosition==view){
                return {
                    ...item,
                    "display":true
                }
            }
            else{
                return {
                    ...item,
                    "display":false
                }
            }
        })
        this.setState({images:new_items})
    }

    ageFilter = () => {
        const new_items = this.state.images.map(item=>{
            
            if (item.PatientAge==this.state.age){
                return {
                    ...item,
                    "display":true
                }
            }
            else{
                return {
                    ...item,
                    "display":false
                }
            }
        })
        this.setState({images:new_items})
    }

    

    render() {
        console.log(this.state)
        return (
            <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">
            <div>
                <h2 class="text-2xl font-semibold leading-tight">Results</h2>
            </div>
            <div class="my-2 flex flex-col px-4">
               <div>
                    <label for="quantity">Filter By Age: </label>
                    <br />
                    <input 
                    style = {{width:"100px"}}
                    className = "outline-none mx-2 border-solid border-2 border-black-600" 
                    type="number" id="age" name="age" min="1" max="100" 
                    value = {this.state.age}
                    onChange = {(e)=>{this.setState({age:e.target.value})}}
                    />
                    <button onClick={()=>this.ageFilter()} class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full">
                    Apply Age Filter
                    </button>
                    <button onClick={()=>{
                        this.viewFilter("all")
                        this.setState({age:""})
                        }} class="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full">
                    Reset Age Filter
                    </button>
               </div>
               <div>
                    <h1 className = " my-2">Filter By View Position</h1> 
                   <div>
                   <span class=" cursor-pointer tracking-wider text-white bg-green-500 hover:bg-green-800 px-4 py-1 text-sm rounded-full leading-loose mx-2 font-semibold" title=""
                            onClick = {()=>this.viewFilter("all")}
                            >
                            All
                            </span>
                    <span class=" cursor-pointer tracking-wider text-white bg-blue-500 hover:bg-blue-800 px-4 py-1 text-sm rounded-full leading-loose mx-2 font-semibold" title=""
                            onClick = {()=>this.viewFilter("PA")}
                            >
                            PA
                            </span>
                        <span 
                        class="cursor-pointer tracking-wider text-white bg-orange-500 hover:bg-orange-700 px-4 py-1 text-sm rounded-full leading-loose font-semibold" 
                        title=""
                        onClick = {()=>this.viewFilter("LL")}>
                            LL
                        </span>
                   </div>
               </div>

               <h1 className = " my-2">Filter By Prediction</h1> 
               <div class="relative">
                    <span class=" cursor-pointer tracking-wider text-white bg-green-500 hover:bg-green-800 px-4 py-1 text-sm rounded-full leading-loose mx-2 font-semibold" title=""
                        onClick = {()=>this.covidFilter("all")}
                        >
                        All
                        </span>
                        <span 
                    class="cursor-pointer tracking-wider text-white bg-orange-500 hover:bg-orange-700 px-4 py-1 text-sm rounded-full mx-2 leading-loose font-semibold" 
                    title=""
                    onClick = {()=>this.covidFilter("both")}>
                        Suspected/Opacity
                    </span>
                    <span 
                    class="cursor-pointer tracking-wider text-white bg-orange-500 hover:bg-orange-700 px-4 py-1 text-sm rounded-full leading-loose font-semibold" 
                    title=""
                    onClick = {()=>this.covidFilter("covid")}>
                        Suspected
                    </span>

                        <span class="cursor-pointer tracking-wider text-white bg-red-500 hover:bg-red-700 px-4 py-1 text-sm rounded-full leading-loose mx-2 font-semibold" title=""
                        onClick = {()=>this.covidFilter("opacity")}
                        >
                        Opacity
                        </span>

                        <span class="cursor-pointer tracking-wider text-white bg-blue-500 hover:bg-blue-700 px-4 py-1 text-sm rounded-full leading-loose mx-2 font-semibold" title=""
                        onClick = {()=>this.covidFilter("nofinding")}
                        >
                        No Findings
                        </span>
                    </div>
                
                
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Filename
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Patient ID
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Patient Sex
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Patient Age
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    View Position
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Predicted Label
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    X-Ray Image
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Gradcam Image
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           {this.state.images && 
                           this.state.images.filter(item=>item["display"] == true).map(item=>{
                            return(
                                <TableRow 
                                filename = {item.filename}
                                patientId = {item.patientID}
                                sex = {item.PatientSex}
                                Age = {item.PatientAge}
                                view = {item.ViewPosition}
                                prediction = {item["Predicted Label"]} />
                            )
                        })
                           }
                        </tbody>
                    </table>
                    <div
                        class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span class="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
                        <div class="inline-flex mt-2 xs:mt-0">
                            <button
                                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            <button
                                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CSVLink data={this.state.images} headers={headers}>
                <button class="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style = {{}}>
                    
                    Download Data as CSV
                    
                </button>
                </CSVLink>
    </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        images: state.Image
    }
}

export default connect(mapStateToProps,null)(Past);
