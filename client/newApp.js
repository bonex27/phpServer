/*
###APP LOAD###
*/

let levelsToApp = 0; //DEBUG ONLY. Use if app.html is not at the root of the website (eg: 192.168.1.27/somefolder/app.html)
//Specify how many levels there are to reach it (1 for the previous example)
let appTitle;
let appContainer;
let appNavbar;
let appResult;


window.addEventListener("load", loadIndex);

function loadIndex() {
    appTitle = document.getElementById("appTitle");

    appContainer = document.getElementById("button");

    appResult = document.getElementById("button");

    appNavbar = document.getElementById("appNavbar");

    appTitle.innerHTML = "<a  text-black'>Menu</a>";
    appContainer.innerHTML = '<table class="table"><tbody><tr><td><button class="btn btn-primary" onclick="loadPage(1)" type="button">Alunni</button></td><td><button class="btn btn-success" onclick="loadPage(2)" type="button">Classi</button></td></tr></tbody></table>';
}

function Delete(id, call) {
    switch (call) {
        case 1:
            getUrl = 'http://localhost/work/phpServer/API/students.php/' + id;
            break;
        case 2:
            getUrl = 'http://localhost/work/phpServer/API/classes.php/' + id;
            break;
        case 3:
            getUrl = 'http://localhost/work/phpServer/API/studentsClasses.php/' + id;
            break;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", getUrl, true);
    xhr.onload = function() {
        loadPage(call);
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}

function loadPage(call) {
    let title, button;
    appTitle.innerHTML = "";

    title = document.createElement("a");
    title.addEventListener("click",
        function() {
            loadIndex();
        });
    title.className = "clickable text-black";
    title.innerHTML = "<- Back";
    appTitle.appendChild(title);

    switch (call) {
        case 1:

            appContainer.innerHTML = "";

            var table = document.createElement("table");
            var thead = document.createElement("thead");
            table.setAttribute("class", "table");
            thead.className = "thead-dark";
            table.appendChild(thead);
            appContainer.appendChild(table);

            var tr = document.createElement('tr');
            tr.innerHTML =
                '<th>id</th>' +
                '<th>Nome</th>' +
                '<th>Cognome</th>' +
                '<th>Sidi Code</th>' +
                '<th>Tax Code</th>' +
                '<th>Delete</th>'+
                '<th>Edit</th>';
            thead.appendChild(tr);

            var xhr = new XMLHttpRequest();
            xhr.open("GET", './API/students.php', true);
            xhr.onload = function() {
                var data = JSON.parse(xhr.response);
                let tr, td, button;

                for (var i = 0; i < data.length; i++) {
                    tr = document.createElement('tr');
                    tr.innerHTML =
                        '<td>' + data[i].id + '</td>' +
                        '<td>' + data[i].name + '</td>' +
                        '<td>' + data[i].surname + '</td>' +
                        '<td>' + data[i].sidi_code + '</td>' +
                        '<td>' + data[i].tax_code + '</td>';
                
                        td = document.createElement("td");
                        button = document.createElement("button");
                    let id = data[i].id;


                    button.className = "btn btn-danger";
                    button.addEventListener("click",
                        function() {
                            Delete(id, call);
                        });
                    button.innerHTML = "x";
                    td.appendChild(button);
                    tr.appendChild(td);

                    td = document.createElement("td");
                    button = document.createElement("button");
                    
                    button.className = "btn btn-success";                 
                    button.addEventListener("click",
                                            function()
                                            {
                                                edit(id,call);
                                            });
                    
                    button.innerHTML="Edit";                       
                    td.appendChild(button);
                    tr.appendChild(td);
                    table.appendChild(tr);
                }

            };
            xhr.onerror = function() {
                alert("Errore");
            };
            xhr.send();
            break;

        case 2:
            appContainer.innerHTML = "";

            var table = document.createElement("table");
            var thead = document.createElement("thead");
            table.setAttribute("class", "table");
            thead.className = "thead-dark";
            table.appendChild(thead);
            appContainer.appendChild(table);

            var tr = document.createElement('tr');
            tr.innerHTML =
                '<th>id</th>' +
                '<th>year</th>' +
                '<th>Section</th>' +
                '<th>Delete</th>'+
                '<th>Edit</th>';
            thead.appendChild(tr);

            var xhr = new XMLHttpRequest();
            xhr.open("GET", './API/classes.php', true);
            xhr.onload = function() {
                var data = JSON.parse(xhr.response);
                let tr, td, button;

                for (var i = 0; i < data.length; i++) {
                    tr = document.createElement('tr');
                    tr.innerHTML =
                        '<td>' + data[i].id + '</td>' +
                        '<td>' + data[i].year + '</td>' +
                        '<td>' + data[i].section + '</td>';
                        td = document.createElement("td");
                        button = document.createElement("button");
                    let id = data[i].id;


                    button.className = "btn btn-danger";
                    button.addEventListener("click",
                        function() {
                            Delete(id, call);
                        });
                    button.innerHTML = "x";
                    td.appendChild(button);
                    tr.appendChild(td);

                    td = document.createElement("td");
                    button = document.createElement("button");
                    
                    button.className = "btn btn-success";                 
                    button.addEventListener("click",
                                            function()
                                            {
                                                edit(id, call);
                                            });
                    
                    button.innerHTML="Edit";                       
                    td.appendChild(button);
                    tr.appendChild(td);
                    table.appendChild(tr);
                }

            };
            xhr.onerror = function() {
                alert("Errore");
            };
            xhr.send();
            break;
    }
}

function edit(id, call) {
    document.getElementById('modalTitle').innerHTML ="Modifica";
    let button
    switch (call) {
        
        case 1:
            getUrl = 'http://localhost/work/phpServer/API/students.php/' + id;
            
            document.getElementById('modalBody').innerHTML ='<form class="form-signin" method="GET" id="form">'+
            '<h1 class="h3 mb-3 font-weight-normal">Edit studets</h1>'+
            '<label for="inputName" >Name</label>'+
            '    <input type="text" id="inputName" class="form-control"  name="email">'+
            '<label for="inputSurname" >Surname</label>'+
            '    <input type="text" id="inpuSurname" class="form-control" >'+
            '<label for="inputTaxcode" >Sidicode</label>'+
            '    <input type="text" id="inputSidicode" class="form-control"  >'+
            '<label for="inputSidicode" >Taxcode</label>'+
            '    <input type="text" id="inputTaxcode" class="form-control" >'+
        '</form>';
            document.getElementById('modalBtn').innerHTML ="No";
    
             button = document.createElement("button");
            button.innerHTML="Si";
            button.className="btn btn-success";
            button.type ="button";
            button.id="modalBtnOk";
            button.addEventListener("click", function()
            {
                var name = document.getElementById("inputName").value;
                var surname = document.getElementById("inpuSurname").value;
                var sidiCode = document.getElementById("inputSidicode").value;
                var taxCode = document.getElementById("inputTaxcode").value;
                var obj = { name: name, surname: surname, sidiCode: sidiCode, taxCode: taxCode};
                var myJSON = JSON.stringify(obj);
                $('#modalAll').modal('hide');
                editCall(id,call,myJSON);
                

            });
            $('#modalAll').on('hidden.bs.modal', function (e) {
                $("#modalBtnOk" ).remove();
                document.getElementById('modalBtn').removeEventListener('click',list());
            })
            document.getElementById("modalFooter").appendChild(button);
            $('#modalAll').modal('show');

            break;
        case 2:
            getUrl = 'http://localhost/work/phpServer/API/students.php/' + id;
            
            document.getElementById('modalBody').innerHTML ='<form class="form-signin" method="GET" id="form">'+
            '<h1 class="h3 mb-3 font-weight-normal">Edit class</h1>'+
            '<label for="inputYear" >Year</label>'+
            '    <input type="text" id="inputYear" class="form-control"  name="email">'+
            '<label for="inputSection" >Section</label>'+
            '    <input type="text" id="inputSection" class="form-control" >'+
        '</form>';
            document.getElementById('modalBtn').innerHTML ="No";
    
             button = document.createElement("button");
            button.innerHTML="Si";
            button.className="btn btn-success";
            button.type ="button";
            button.id="modalBtnOk";
            button.addEventListener("click", function()
            {
                var year = document.getElementById("inputYear").value;
                var section = document.getElementById("inputSection").value;
                var obj = { year: year, section: section};
                var myJSON = JSON.stringify(obj);
                $('#modalAll').modal('hide');
                editCall(id,call,myJSON);
                

            });
            $('#modalAll').on('hidden.bs.modal', function (e) {
                $("#modalBtnOk" ).remove();
                document.getElementById('modalBtn').removeEventListener('click',list());
            })
            document.getElementById("modalFooter").appendChild(button);
            $('#modalAll').modal('show');
            break;
        case 3:
            getUrl = 'http://localhost/work/phpServer/API/studentsClasses.php/' + id;
            break;
    }
}
function editCall(id,call,json)
{
    switch (call) {
        case 1:
            getUrl = 'http://localhost/work/phpServer/API/students.php/' + id;
            break;
        case 2:
            getUrl = 'http://localhost/work/phpServer/API/classes.php/' + id;
            break;
        case 3:
            getUrl = 'http://localhost/work/phpServer/API/studentsClasses.php/' + id;
            break;
    }
    var xhr = new XMLHttpRequest();

    xhr.open("PATCH", getUrl, false);
    xhr.onload =loadPage(call);
    xhr.onerror = function()
    {
        alert("Errore");
    };

    xhr.send(json);
}