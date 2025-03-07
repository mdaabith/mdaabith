let inneruploadImage=document.querySelector(".inner-upload-image")
let input=inneruploadImage.querySelector("input");
let image=document.querySelector("#image")
let loading=document.querSelector("#loading")
let btn=document.querySelector("button")
let text=document.querySelector("#text")
let output=document.querySelector(".output")

const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$GEMINI_API_KEY"

let fileDetails={
    "mime_type":null,
    "data":null
}
async function generateResponse() {
    const RequestOption={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body :JSON.stringify({
            "contents": [{
            "parts":[
      {"text": "solve the mathematical problem with proper steps of solution"},
      {
        "inline_data": {
          "mime_type":fileDetails.mime_type,
          "data": fileDetails.data
        }
      }
    ]
  }]
        })
    }
try{
    let response=await fetch(Api_Url,RequestOption)
    let data=await response.json()
    let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
    text.innerHTML=apiResponse
    output.style.display="block"

}
catch(r){
    console.log(e)
}
finally{
    loading.style.display="none"
}
}


input.addEventListener("change",(e)=>{
    const file=input.files[0]
if(!file)return
let reader=new FileReader()
reader.onload=(e)=>{
    let base64data=e.target.result.split(",")[1]
fileDetails.mime_type=file.type;
fileDetails.data=base64data
inneruploadImage.querySelector("span").style.display="none"
inneruploadImage.querySelector("#icon").style.display="none"
image.style.display="block"
image.src=`data:${fileDetails.mime_type};base64,${fileDetails.data}`
output.style.display="none"
}

reader.readAsDataURL(file)
})
btn.addEventListener("click",()=>{
    loading.style.display="block"
    generateResponse()
})


inneruploadImage.addEventListener("click",()=>{
    input.click()
})
