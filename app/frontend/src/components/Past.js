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
        age: null,
        filename: "results"
    }


    covidFilter = (tag,element) => {
        
        const buttons = document.querySelectorAll(".predictButtons")
        for(let i = 0;i<buttons.length;i++){
            if(buttons[i].classList.contains("bg-blue-400")){
                buttons[i].classList.remove('bg-blue-400')
            }
        }
        for(let i = 0;i<buttons.length;i++){
            console.log(buttons[i].innerHTML)
            if(buttons[i].innerHTML===element){
                buttons[i].classList.add('bg-blue-400')
            }
        }

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

    viewFilter = (view,element) => {
        const buttons = document.querySelectorAll(".viewButtons")
        for(let i = 0;i<buttons.length;i++){
            if(buttons[i].classList.contains("bg-blue-400")){
                buttons[i].classList.remove('bg-blue-400')
            }
        }
        for(let i = 0;i<buttons.length;i++){
            if(buttons[i].innerHTML===element){
                buttons[i].classList.add('bg-blue-400')
            }
        }
        
        console.log(element)
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

    ageFilter = (tag) => {
        const ageButton = document.querySelector(".ageFilter")
        if (tag == "all"){
            if(ageButton.classList.contains("bg-blue-400")){
                ageButton.classList.remove('bg-blue-400')
            }
        }
        else{
            ageButton.classList.add('bg-blue-400')
        }
        
        
        

        const new_items = this.state.images.map(item=>{
            if(tag == "all"){
                return {
                    ...item,
                    display:true
                }
            }
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
        console.log(this.props)
        return (
            <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">
            <div>
                <h2 class="text-2xl font-semibold leading-tight">Results</h2>
                <p>* Only PA and AP X-ray views are accepted</p>
                <p>*GRADCAM and the predictions of the model is still experimental and the clinician has the final decision on the validity of the model's results</p>
            </div>
            <div class="my-2 flex flex-col px-4">
               <div>
                    <label for="quantity">Filter By Age: </label>
                    <br />
                    <input 
                    style = {{width:"100px"}}
                    className = "ageButtons outline-none mx-2 border-solid border-2 border-black-600 py-2 px-4" 
                    type="number" id="age" name="age" min="1" max="100" 
                    value = {this.state.age}
                    onChange = {(e)=>{this.setState({age:e.target.value})}}
                    />
                    <span onClick={()=>this.ageFilter("")} class="ageFilter cursor-pointer ageButtons bg-transparent mx-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Apply Age Filter
                    </span>
                    <span onClick={()=>{
                        this.ageFilter("all")
                        this.setState({age:""})
                        }} class="cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Reset Age Filter
                    </span>
               </div>
               <div>
                    <h1 className = " my-2">Filter By View Position</h1> 
                   <div>
                   <span class="cursor-pointer viewButtons mx-2 bg-blue-400 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" title=""
                            onClick = {()=>this.viewFilter("all","All")}
                            >
                            All
                            </span>
                    <span class="cursor-pointer viewButtons mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" title=""
                            onClick = {()=>this.viewFilter("PA","PA")}
                            >
                            PA
                            </span>
                        <span 
                        class="cursor-pointer viewButtons mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        title=""
                        onClick = {()=>this.viewFilter("AP","AP")}>
                            AP
                        </span>
                   </div>
               </div>

               <h1 className = " my-2">Filter By Prediction</h1> 
               <div class="flex flex-wrap ">
                    <span class="predictButtons my-2 cursor-pointer mx-2 bg-blue-400 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"  title=""
                        onClick = {()=>this.covidFilter("all","All")}
                        >
                        All
                        </span>
                        <span 
                    class="predictButtons my-2 cursor-pointer mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
                    title=""
                    onClick = {()=>this.covidFilter("both","Suspected/Opacity")}>
                        Showing COVID symptoms (Suspected & Opacity)
                    </span>
                    <span 
                    class="predictButtons my-2 cursor-pointer mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
                    title=""
                    onClick = {()=>this.covidFilter("covid","Suspected")}>
                        Suspected
                    </span>

                        <span 
                        class="predictButtons my-2 cursor-pointer mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
                        title=""
                        onClick = {()=>this.covidFilter("opacity","Opacity")}
                        >
                        Opacity
                        </span>

                        <span 
                        class="predictButtons my-2 cursor-pointer mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
                        title=""
                        onClick = {()=>this.covidFilter("nofinding","No Findings")}>No Findings</span>
                    </div>
                <h1 className = " my-2">Download Results</h1>
                <div>
                
                <input 
                    style = {{width:"100px"}}
                    className = "ageButtons outline-none mx-2 border-solid border-2 border-black-600 py-2 px-4" 
                    type="text" id="age" name="age" min="1" max="100" 
                    value = {this.state.filename}
                    onChange = {(e)=>{this.setState({filename:e.target.value})}}
                    />
                <CSVLink 
                data={this.state.images} 
                headers={headers}
                filename = {`${this.state.filename}.csv`}
                >
                <button class="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style = {{}}>
                    
                    Download Data as CSV
                    
                </button>
                </CSVLink>
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
