import React,{useEffect,useState} from 'react'

const TableRow = (props) => {
    const [image, updateImage] = React.useState("");
    //Create new_state Object for Gradcam
    const [GradCam, updateGradCam] = React.useState("");
//    {"0":["covid"],"1":["nofinding"],"2":["opacity"]}

    const createTag = (tag) =>{
        if(tag=="covid"){
            return(<span
                class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                <span aria-hidden
                    class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                <span class="relative">Suspected Covid</span>
            </span>)
        }
        if(tag=="nofinding"){
            return(<span
                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                <span class="relative">No Findings</span>
            </span>)
        }
        if(tag=="opacity"){
            return(<span
                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                <span class="relative">Opacity</span>
            </span>)
        }
    }

    useEffect(() => {
        // Create an scoped async function in the hook
        async function getImage() {
            fetch(`http://localhost:5000/uploads/${props.filename}`)
            .then(response => response.blob())
            .then(blob => updateImage(URL.createObjectURL(blob)))
        }
        //Modify this to the api endpoint for the gradcam
        async function getGradcam() {
            fetch(`http://localhost:5000/gradcam/${props.filename}`)
            .then(response => response.blob())
            .then(blob => updateGradCam(URL.createObjectURL(blob)))
        }
        
        getImage();
        if(props.prediction=="nofinding"){
            updateGradCam("NA")
        }else{
            getGradcam();
        }
        
      }, []);

    const createGradCamImage = (gc) => {
        if(gc=="NA"){
            return <p>No Gradcam Produced</p>
        }
        else if(gc===""){
            return null
        }
        else{
            return <img style = {{minWidth:"130px",maxWidth:"130px"}} alt="home" src={ GradCam }></img>
        }
        
    }
    const GradcamImage = createGradCamImage(GradCam)
    const Tag = createTag(props.prediction)
    
    if(props.view!="PA" && props.view!="AP"){
        return (
            <tr>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{props.filename}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{props.patientId}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{props.sex}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{props.Age}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{props.view}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">View Position Unsupported</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    { image && <img style = {{minWidth:"130px",maxWidth:"130px"}} alt="home" src={ image }></img> }
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    Gradcam Unavaliable
                </td>
            </tr>
        )
    }else{
        return (
            <tr>                        
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{props.filename}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{props.patientId}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{props.sex}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{props.Age}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{props.view}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{Tag}</p>
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    { image && <img style = {{minWidth:"130px",maxWidth:"130px"}} alt="home" src={ image }></img> }
                </td>
                <td class="px-5 py-5 bg-white text-sm">
                    {GradcamImage}
                </td>
               
            </tr>
        )
    }
    
}

export default TableRow;