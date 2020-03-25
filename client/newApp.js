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

function delStudent(id, call) {
    switch (call) {
        case 1:
            getUrl = 'http://192.168.1.27/phpServer/API/students.php/' + id;
            break;
        case 2:
            getUrl = 'http://192.168.1.27/phpServer/API/classes.php/' + id;
            break;
        case 3:
            getUrl = 'http://192.168.1.27/phpServer/API/studentsClasses.php/' + id;
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
                '<th>Delete</th>';
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
                            delStudent(id, call);
                        });
                    button.innerHTML = "x";

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
                '<th>Delete</th>';
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
                            delStudent(id, call);
                        });
                    button.innerHTML = "x";

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