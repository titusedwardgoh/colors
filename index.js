let coloursArray =["#e3e8ea","#bccad0","#9ba8ae","#707a7e","#495054"]
const pickedColor = document.getElementById("intial-color")
const palette = document.querySelector(".palette")
const colorType= document.getElementById("color-type")
const footerEl = document.getElementById("footer-container")
const buttonEl = document.getElementById("Gcs")

let pickedColorType = "monochrome"
let firstcolor="#e3e8ea"
let url = `https://www.thecolorapi.com/scheme?hex=${firstcolor.slice(1)}&format=json&mode=${pickedColorType}&count=4`

pickedColor.addEventListener('input',()=>{
    firstcolor=pickedColor.value
    updateFirstColor(firstcolor)
    renderColours()
})

colorType.addEventListener('change',()=>{
    pickedColorType = colorType.value
})

buttonEl.addEventListener("click", () => {
    url = `https://www.thecolorapi.com/scheme?hex=${firstcolor.slice(1)}&format=json&mode=${pickedColorType}&count=4`;
    fetchColorScheme(url)
});

function renderColours(){
    let htmlString =``
    let footerHtml = ``
    coloursArray.forEach((color,index)=>{
            htmlString+= `<div style="background-color: ${color};" class="color ${index+1}"></div>`
            footerHtml+= `<div class="footer ${index+1}">${color}</div>`
    })
    palette.innerHTML = htmlString
    footerEl.innerHTML = footerHtml
    url = `https://www.thecolorapi.com/scheme?hex=${firstcolor.slice(1)}&format=json&mode=${pickedColorType}&count=4`
}

function updateFirstColor(firstcolor){
    coloursArray.shift()
    coloursArray.unshift(firstcolor)
}

function fetchColorScheme(url) {
setTimeout(()=> {
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        data.colors.forEach((color,index)=>{
            coloursArray[index+1]=color.hex.value
            console.log(color.hex.value)
        })
        renderColours()
    })
},200
)}

renderColours()
