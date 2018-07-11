/*
1.Never mess with css in javascript
2.Whenever possible select elements by Id's - append numbers to dynamic DOM elements
3.Use better naming conventions
*/

txtbAddTask = document.getElementById("txtbAddTask"); //intializing textbox as variable

function insertTask() { //insert task function
    
    var txtbTxt = document.getElementById("txtbAddTask").value; //text in textbox
    var li = document.createElement("li"); //new list item
    var newTask = document.createTextNode(txtbTxt); //new text node with value of text in textbox
    var p = document.createElement("p"); //new paragraph DOM element for storing text for task 
    p.appendChild(newTask); //text is part of paragraph

    if(txtbTxt === '') { //if textbox is blank then...
        //do nothing
    } else { //if textbox is not blank then...
        document.getElementById("ulTaskList").appendChild(li); //add new task to the task list
        document.getElementById("txtbAddTask").value = "";  //making textbox blank
    }
    
    var chkb = document.createElement("INPUT"); //new input DOM element
    chkb.type = "checkbox" //checkbox input DOM element
    chkb.className = "check"; //assigning class for CSS styling and formatting
    chkb.addEventListener("change", checkFunc); //when checked execute check function
    li.appendChild(chkb); //append checkbox to task 
    li.appendChild(p); //append paragraph
    
    var btnEdit = document.createElement("BUTTON"); //new button
    btnEdit.className = "edit"; //assigning class for CSS styling and formatting
    btnEdit.innerText = "Edit"; //labelling button
    btnEdit.addEventListener("click", editFunc); //when clicked execute edit function
    li.appendChild(btnEdit); //append edit button to task

    var btnDelete = document.createElement("BUTTON"); //new button
    btnDelete.className = "delete"; //assigning class for CSS styling and formatting
    btnDelete.innerText = "Delete"; //labelling button
    btnDelete.addEventListener("click", deleteFunc); //when clicked execute delete function
    li.appendChild(btnDelete); //append delete button to task
}

txtbAddTask.addEventListener("keypress", function(event) { //event listener for a key press
    if(event.keyCode === 13) { //if key pressed is enter key then...
        event.preventDefault(); //preventing default action for enter key
        insertTask(); //executing insert task function
    }
});

function checkFunc() { //check function
    liChildren = this.parentElement.children; //getting all children
    taskTxt = liChildren[1]; //getting paragraph child of task li only
    taskTxt.classList.toggle("checked"); //toggle between crossed off state and normal sate
}

function editFunc() { //edit function
    liChildren = this.parentElement.children; //getting all children
    taskTxt = liChildren[1]; //getting paragraph child of task li only
    taskTxt.setAttribute("contenteditable", true); //make task editable
    taskTxt.focus(); //make task active element
    taskTxt.addEventListener("keypress", function(event) { //eveng listener for a key press
        if(event.keyCode === 13) { //if key pressed is enter key then...
            event.preventDefault(); //preventing default action for enter key
            saveEdit(); //executing save edit function
        }
    });

    function saveEdit() { //save edit function
        if(document.activeElement === taskTxt) { //if task is focused on then...
            taskTxt.blur(); //unfocus from editing task
            taskTxt.setAttribute("contenteditable", false); //make task uneditable
        }
    }
}

function deleteFunc() { //delete function
    this.parentElement.className = "invisible"; //make task disappear
}