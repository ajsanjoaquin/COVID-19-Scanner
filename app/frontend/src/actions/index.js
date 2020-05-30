import Images from '../api/images';

export const postRequest = (images) => async dispatch => {
    
    var formData = new FormData();
    var imageDict = {}
    for (var i = 0; i < images.length; i++) {
        let file = images.item(i);
        formData.append('images[' + i + ']', file, file.name);
        imageDict[file.name] = images.item(i)
    }

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }

    const response = await Images.post('/', formData, config)
    


    dispatch({type:"POST_IMAGE",payload: response,images:imageDict})
}


export const removeData = () => {
    console.log("removeData was called")
    return({type:"REMOVE_DATA"})
}