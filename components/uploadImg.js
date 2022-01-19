export const uploadImage = async(base64, clientid) => {
    const dataURI = base64
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const file = new Blob([ia], {type:mimeString})

    return new Promise((resolve, reject) => {
        const formData = new FormData();
        //console.log(file)
        formData.append("image", file);
        fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: "Client-ID " + clientid
                //Accept: "application/json",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (!response.success){
                    return resolve(null);
                }
                //console.log(response.data.link);
                const imageLink = response.data.link;
                //console.log(imageLink);
                return resolve(imageLink)
        })
        .catch((e) => {
            this.setState({unsubmited: true})
            console.log(e)
            return resolve(e)
        });
    })
}    