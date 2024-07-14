// starting with get all necessary elements 

const noteModal = document.getElementById("note-modal")
const openModalBtn = document.getElementById("getModal")
const closeModal = document.getElementById("close-modal")
const notsArea = document.querySelector(".nots-area")
const indicator = document.getElementById("indicator")
const save = document.getElementById("save")
const edit = document.getElementById("edit")
const deleteBtn = document.getElementById("delete")
const deleteByOne= document.getElementById("deleteByOne")
const colors = document.querySelectorAll(".color")
const textarea = document.querySelector(".textarea")
const footer = document.getElementById("footer")
const warningModal = document.getElementById("warning")

// default variables
var currentColor ="" ;
var currentIndex = 0;
var currentValue = "";
var colorIndex = "";
var noteIndex = 0;
var enableEdit = false;
var noteClicked = false;
var editableNote = false;

// open note modal
openModalBtn.addEventListener('click' , () => { 
  noteModal.classList.add("active")
  editableNote = false;
  textarea.value ="";
  currentColor ="white";
  colorIndex = 1;
})

// renitilize default note values
const defaultStyle = (item) => { 
    item.style.border = "none"
  item.style.color = "black"
noteModal.classList.remove("active")
textarea.value = ""
for(var i=0 ; i<colors.length;i++){
  if(colors[i].getAttribute("data-index") > 1){
colors[i].classList.remove("selected")
  }else{
colors[i].classList.add("selected")
  }
}
editableNote = false;
currentColor = "";
}
// close note modal X
closeModal.addEventListener('click' , () => { 
if(editableNote){
  defaultStyle(textarea)
}else{
  noteModal.classList.remove("active")
}
})

// set background color to textarea

colors.forEach(color  => {
  color.addEventListener("click" , (e) => { 
    // get background color
    const background = color.classList[1]
    const index = color.getAttribute("data-index")
    currentColor = background
    colorIndex = index
    // set background to textarea
    if(background === "white"){
      textarea.style.color="black"
    }else {
      textarea.style.color= background
    }
textarea.style.border = "3px solid " + background
e.target.classList.add("selected")
// remove selected class from note selected color
for(var i=0;i<colors.length;i++){
  if(colors[i].getAttribute("data-index") === index){
    colors[i].classList.add("selected")
  }else{
colors[i].classList.remove("selected")
  }
}
  })
})
// cancel note btn 
const cancel = document.getElementById("cancel")
cancel.addEventListener('click' , () => { 
  defaultStyle(textarea)
  })
  
  // save/edit and display note
  save.addEventListener("click" , () => {
  // control textarea from spaces or empty values
    if(textarea.value.trim().length < 10){
      warningModal.classList.add("active")
    }else {
      // edit an exists note
      if(editableNote){
        
        const nots = document.querySelectorAll(".note")
        for(var i=0;i<nots.length;i++){
          if(nots[i].getAttribute("data-index") === noteIndex){
            nots[i].innerText = textarea.value
if(currentColor === "white" || currentColor === ""){
nots[i].style.color = "black"
nots[i].style.border = "3px solid whiteSmoke"
defaultStyle(textarea)
      }else{
nots[i].style.color = currentColor
nots[i].style.border = `3px solid ${currentColor}`
      }
      noteModal.classList.remove("active")
      //click note
      nots[i].addEventListener("click" , (e) => {
        editableNote = true;
        const getNoteIndex = e.target.getAttribute("data-index")
        const currentColorIndex =
        nots[i].getAttribute("color-index")
        noteIndex = getNoteIndex;
        editableNote = true;
        currentValue = e.target.innerText
        
        currentColor = e.target.style.border
        colorIndex = currentColorIndex
        
          })
   nots[i].setAttribute("color-index",(
        colorIndex
        ))
          //here
          }
        }
      editableNote = false;
      }else {
        // crate new note
var note = document.createElement("div")
      note.setAttribute("class",("col-lg-3 col-md-5 col-12 me-lg-1 me-md-1 mb-2 shadow-4-strong note"))
      
      if(currentColor === "white" || currentColor === ""){
note.style.color = "black"
note.style.border = "3px solid whiteSmoke"
      }else{
note.style.color = currentColor
note.style.border = `3px solid ${currentColor}`
      }
      note.innerText = textarea.value
      note.setAttribute("data-index", currentIndex++)
      
      notsArea.appendChild(note)
      noteModal.classList.remove("active")
      note.setAttribute("color-index",(
        colorIndex ? colorIndex : 1
        ))
      note.addEventListener("click" , (e) => {
        editableNote = true;
     
        const currentNoteIndex = e.target.getAttribute("data-index")
        const currentNoteColorIndex =
        note.getAttribute("color-index")
        noteIndex = currentNoteIndex;
        editableNote = true;
        currentValue = note.innerText
     currentColor = e.target.style.border;
     colorIndex = currentNoteColorIndex;
     
      })
      }
      editableNote = false
      defaultStyle(textarea)
    }
    
  })
  
  // textarea and btns control function
  setInterval(() => {
    // delete all btn control show/hide
    if(notsArea.children.length > 1){
      deleteBtn.classList.remove("disabled")
      indicator.classList.add("d-none")
    }else{
deleteBtn.classList.add("disabled")
      indicator.classList.remove("d-none")
    }
    // edit btn control show/hide
    if(editableNote === true && enableEdit === true){
      edit.classList.remove("disabled")
    }else {
      edit.classList.add("disabled")
    }
    // disable add new note btn while  editing
    if(editableNote === true && noteModal.classList.contains("active")){
openModalBtn.classList.add("disabled")
    }else if(editableNote === true && !noteModal.classList.contains("active")) {
openModalBtn.classList.remove("disabled")
    }else {
      openModalBtn.classList.remove("disabled")
    }
    // add/remove selected class to clicked note
    var myNots = document.querySelectorAll(".note")
    for(var n=0;n<myNots.length;n++){
      if(myNots[n].getAttribute("data-index") === noteIndex && noteClicked === true){
        myNots[n].classList.add("selected")
      }else{
        myNots[n].classList.remove("selected")
      
      }

    }
    // display or hide delete by one btn
    if(editableNote === true && enableEdit === true ){
      deleteByOne.classList.remove("disabled")
    }else {
      deleteByOne.classList.add("disabled")
    }
    
         // delete by one 
     deleteByOne.onclick = () => {
       myNots.forEach(note => {
if(note.classList.contains("selected")){
         note.remove()
         editableNote = false
         
       }
       })
       
     }
     // delete all function
     deleteBtn.onclick = () => {
       myNots.forEach(note => {
         note.remove()
         editableNote = false;
         defaultStyle(textarea)
       })
     }
     // show/hide footer while adding or editing note 
     if(noteModal.classList.contains("active")){
       footer.classList.add("hidden")
     }else {
       footer.classList.remove("hidden")
     }
  },200)
  
  // edit btn.function
  edit.addEventListener("click", () => {
    noteModal.classList.add("active")
    textarea.value = currentValue
    textarea.style.border = currentColor
    console.log(currentColor)
    if(currentColor.replace("3px solid ","") === "whitesmoke"){
      textarea.style.color = "black"
    }else {
      textarea.style.color = currentColor.replace("3px solid ","")
    }
    for(var i=0;i<colors.length;i++){
      if(colors[i].getAttribute("data-index") === colorIndex ){
        colors[i].classList.add("selected") 
      }else {
      colors[i].classList.remove("selected")
      }
    }
    textarea.focus()
  })
  
     // remove selected class from deselected note
document.addEventListener("click", (e) => {
      if(notsArea.contains(e.target)){
  noteClicked = true;
  enableEdit = true;
      }else {
        noteClicked = false;
        enableEdit = false;
      }
      if(e.target === warningModal && warningModal.classList.contains("active")){
        warningModal.classList.remove("active")
        textarea.focus()
      }
     })