import React, { Component } from 'react'
import {useSelector,connect} from 'react-redux';

import TableRow from './TableRow';

class Past extends Component {
    state = {
        images:this.props.images["prev_results"]
        .map(item=>{return {...item,display:true}})
    }

    covidFilter = (tag) => {
        
        const new_items = this.state.images.map(item=>{
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


    render() {
        console.log(this.state)
        return (
            <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">
            <div>
                <h2 class="text-2xl font-semibold leading-tight">Users</h2>
            </div>
            <div class="my-2 flex sm:flex-row flex-col">
                <div class="flex flex-row mb-1 sm:mb-0">
                    <div class="relative">
                        <select
                            class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                        </select>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    <div class="relative">
                    <span class="tracking-wider text-white bg-green-500 px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold" title=""
                        onClick = {()=>this.covidFilter("all")}
                        >
                        All
                        </span>
                    <span 
                    class="tracking-wider text-white bg-orange-500 px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold" 
                    title=""
                    onClick = {()=>this.covidFilter("covid")}>
                        Suspected COVID
                        </span>

                        <span class="tracking-wider text-white bg-red-500 px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold" title=""
                        onClick = {()=>this.covidFilter("opacity")}
                        >
                        Opacity
                        </span>

                        <span class="tracking-wider text-white bg-blue-500 px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold" title=""
                        onClick = {()=>this.covidFilter("nofinding")}
                        >
                        No Findings
                        </span>
                    </div>
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
