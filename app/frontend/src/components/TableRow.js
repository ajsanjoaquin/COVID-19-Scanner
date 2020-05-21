import React,{useEffect,useState} from 'react'

const TableRow = (props) => {
    const [image, updateImage] = React.useState([]);
   
    useEffect(() => {
        // Create an scoped async function in the hook
        async function getImage() {
            fetch(`http://localhost:5000/uploads/${props.filename}`)
            .then(response => response.blob())
            .then(blob => updateImage(URL.createObjectURL(blob)))
        }
        // Execute the created function directly
        getImage();
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
           
        </tr>
    )
}

export default TableRow;