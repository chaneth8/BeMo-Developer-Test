let columns = [];

function addcolumn() {
    /*Add column to kanban board*/ 
    var column_name = prompt("Enter The Name Of The Column");

    if (column_name == "") {
        alert("Enter a valid name please!");
        return;
    }

    columns.push(column_name);

    let main = document.getElementById("main");

    var column = document.createElement('div');
    column.classList.add("columns");

    var table =  document.createElement('table');
    table.setAttribute("id", column_name);
    /*table.classList.add("table");*/ 

    var firstrow = document.createElement('tr');
    var header = document.createElement('th');
    var secondrow = document.createElement('tr');
    var add_and_delete = document.createElement('td');

    var add_button = document.createElement('button');
    var delete_button = document.createElement('button');

    header.innerHTML = column_name;
    firstrow.appendChild(header); 

    add_button.innerHTML = "Add A Task"; 
    delete_button.innerHTML = "Delete A Task";
    /*console.log(column_name); */ 
    add_button.setAttribute('onclick','addtask("' + column_name + '")');
    delete_button.setAttribute('onclick','deletetask()');

    add_and_delete.appendChild(add_button);
    add_and_delete.appendChild(delete_button);
    secondrow.appendChild(add_and_delete);

    table.appendChild(firstrow);
    table.appendChild(secondrow);

    column.appendChild(table);

    main.appendChild(column);
}

function deletecolumn() {
    /*Delete column from kanban board*/ 
    var name = prompt("Enter The Name Of The Column You Would Like To Delete");
    var task = document.getElementById(name);

    if (task == null) {
        alert("No such column exists!");
        return;
    }

    var parent = task.parentElement.parentElement;
    columns.splice(columns.indexOf(name), 1);
    parent.removeChild(task.parentElement);
}

function addtask(column_name) {
    /*Add task to a column on the kanban board*/ 
    var name = prompt("Enter The Name Of The Task");

    var description = prompt("Enter A Description Of The Task");

    if (column_name == "" || description == "") {
        alert("Enter a valid name/description please!");
        return;
    }

    var newrow = document.createElement('tr'); 

    var table =  document.createElement('table');
    var firstrow = document.createElement('tr');
    var secondrow = document.createElement('tr');
    var thirdrow = document.createElement('tr');


    table.setAttribute("id", name);
    firstrow.innerHTML = name;

    var left_button = document.createElement('button');
    left_button.setAttribute('onclick', 'moveleft("' + name + '")');
    var right_button = document.createElement('button');
    right_button.setAttribute('onclick','moveright("' + name + '")');
    left_button.innerHTML = "<=";
    right_button.innerHTML = "=>";

    secondrow.appendChild(left_button);
    secondrow.appendChild(right_button);

    thirdrow.innerHTML = description;

    table.appendChild(firstrow);
    table.appendChild(secondrow);
    table.appendChild(thirdrow);


    newrow.appendChild(table);

    let main_table = document.getElementById(column_name);
    /*console.log(main_table);*/ 
    main_table.appendChild(newrow);
}

function deletetask() {
    /*Delete task from a column on the kanban board*/ 
    var name = prompt("Enter The Name Of The Task You Would Like To Delete");
    var task = document.getElementById(name);

    if (task == null) {
        alert("No such task exists!");
        return;
    }

    var parent = task.parentElement;
    parent.removeChild(task);
}

function moveleft(name) {
    /*Moves a card left*/ 
    let x = columns.indexOf(document.getElementById(name).parentElement.parentElement.id);

    for (let i  = 0; i < columns.length; i++) {
        console.log(columns[i]);
    }
    /*console.log(x);
    console.log(document.getElementById(name).childNodes[0].innerHTML);
    console.log(document.getElementById(name).childNodes[2].innerHTML);*/ 

    if (x == 0 || x == -1) {
        return;
    }

    let leftcolumn = columns[x - 1];
    let task_name = document.getElementById(name).childNodes[0].innerHTML;
    let task_description = document.getElementById(name).childNodes[2].innerHTML;

    var task = document.getElementById(name);
    var parent = task.parentElement;
    parent.removeChild(task);

    shifttask(leftcolumn, task_name, task_description);
}

function moveright(name) {
    /*Moves a card right*/ 
    let x = columns.indexOf(document.getElementById(name).parentElement.parentElement.id);

    /*for (let i  = 0; i < columns.length; i++) {
        console.log(columns[i]);
    }*/ 


    if (x ==  columns.length - 1 || x == -1) {
        return;
    }

    /*console.log(x);
    console.log(document.getElementById(name).childNodes[0].innerHTML);
    console.log(document.getElementById(name).childNodes[2].innerHTML);*/ 

    let rightcolumn = columns[x + 1];
    let task_name = document.getElementById(name).childNodes[0].innerHTML;
    let task_description = document.getElementById(name).childNodes[2].innerHTML;

    var task = document.getElementById(name);
    var parent = task.parentElement;
    parent.removeChild(task);

    shifttask(rightcolumn, task_name, task_description);
}

function shifttask(column_name, name, description) {
    /*Helper functino for moveright and moveleft*/ 
    var newrow = document.createElement('tr'); 

    var table =  document.createElement('table');
    var firstrow = document.createElement('tr');
    var secondrow = document.createElement('tr');
    var thirdrow = document.createElement('tr');


    table.setAttribute("id", name);
    firstrow.innerHTML = name;

    var left_button = document.createElement('button');
    left_button.setAttribute('onclick', 'moveleft("' + name + '")');
    var right_button = document.createElement('button');
    right_button.setAttribute('onclick','moveright("' + name + '")');
    left_button.innerHTML = "<=";
    right_button.innerHTML = "=>";

    secondrow.appendChild(left_button);
    secondrow.appendChild(right_button);

    thirdrow.innerHTML = description;

    table.appendChild(firstrow);
    table.appendChild(secondrow);
    table.appendChild(thirdrow);

    newrow.appendChild(table);

    let main_table = document.getElementById(column_name);
    /*console.log(main_table);*/ 
    main_table.appendChild(newrow);
}