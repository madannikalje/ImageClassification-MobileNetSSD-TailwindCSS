let img;
let model;
let file;
let fileItem;

function setup() {
    model = ml5.imageClassifier('MobileNet', () => {
        console.log("Model Ready")
    })
    file = document.getElementById("file-upload")
    file.addEventListener('change', () => {
        fileItem = file.files[0];
        // console.log(fileItem.name)
        let fileNameElement = document.getElementById("upload-name")
        if (fileItem.name.length > 11) {
            fileNameElement.innerHTML = fileItem.name.slice(0, 7) + "..."
        } else {
            fileNameElement.innerHTML = fileItem.name
        }
        img = URL.createObjectURL(fileItem)
        console.log("in Setup ", img.length)
    })

}

function loadImg() {
    if (img) {
        document.getElementById("pred").innerText = ""
        document.getElementById("conf").innerText = ""
        console.log("in loadImg ", img)

        let imgShowElement = document.getElementById("imgShow")
        imgShowElement.setAttribute("src", img)
        console.log(imgShowElement.getAttribute('src'))
        img = imgShowElement
    } else {
        alert("Enter Image First")
    }

}

function predict() {
    if (img) {
        model.predict(img, (err, pred) => {
            if (err) {
                console.error(err)
                document.getElementById("pred").innerText = err
            } else {
                document.getElementById("pred").innerText = pred[0].label
                document.getElementById("conf").innerText = pred[0].confidence.toFixed(4) * 100 + "% Sure"
            }
        })
    } else {
        alert("Enter Image First")
    }
}