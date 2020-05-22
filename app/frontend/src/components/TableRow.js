import React,{useEffect,useState} from 'react'

const TableRow = (props) => {
    const [image, updateImage] = React.useState([]);
    //Create new_state Object for Gradcam
    const [GradCam, updateGradCam] = React.useState([]);
   
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
        getGradcam();
      }, []);
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
                <p class="text-gray-900 whitespace-no-wrap">{props.prediction}</p>
            </td>
            <td class="px-5 py-5 bg-white text-sm">
                { image && <img alt="home" src={ image }></img> }
            </td>
            <td class="px-5 py-5 bg-white text-sm">
                { GradCam && <img alt="home" src={ GradCam }></img> }
            </td>
           
        </tr>
    )
}

export default TableRow;