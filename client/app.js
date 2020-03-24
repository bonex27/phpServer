/*
###APP LOAD###
*/

let levelsToApp = 0; //DEBUG ONLY. Use if app.html is not at the root of the website (eg: localhost/somefolder/app.html)
//Specify how many levels there are to reach it (1 for the previous example)
let appTitle;
let appContainer;
let appNavbar;
appTitle = document.getElementById("appTitle");

appContainer = document.getElementById("appContainer");

appNavbar = document.getElementById("appNavbar");

window.addEventListener("load", loadIndex);

function loadIndex() {
    appTitle = document.getElementById("appTitle");

    appContainer = document.getElementById("appContainer");

    appNavbar = document.getElementById("appNavbar");

    appTitle.innerHTML = "<a  text-black'>Menu</a>";
    appContainer.innerHTML = '<table class="table"><tbody><tr><td><button class="btn btn-primary" onclick="loadPage(1)" type="button">Alunni</button></td><td><button class="btn btn-success" onclick="loadPage(2)" type="button">Classi</button></td><td><button class="btn btn-info" onclick="loadPage(3)" type="button">Allocazione alunni</button></td></tr></tbody></table>';
}


function get(call)
{
    var getUrl;
    var id = document.getElementById("input").value;
    switch(call)
    {
        case 1:
             getUrl = 'http://ipack.dx.am/API/students.php';
            break;
        case 2:
             getUrl = 'http://ipack.dx.am/API/classes.php';
            break;
        case 3:
             getUrl = 'http://ipack.dx.am/API/studentsClasses.php';
                break;
    }
    

    if()
        getUrl+="/"+id;
    

        var table = document.createElement("table");
        var thead = document.createElement("thead");
        table.setAttribute("class", "table");
        thead.className = "thead-dark";
        table.appendChild(thead);
        appContainer.appendChild(table);
    
        var tr = document.createElement('tr');
        tr.innerHTML =
            '<th>id</th>' +
            '<th>Sezione</th>' ;
        thead.appendChild(tr);



    var xhr = new XMLHttpRequest();
    xhr.open("GET", getUrl, true);
    xhr.onload = function() {
        var data = JSON.parse(xhr.response);
        data = data[0];
        
        let tr, td, button;

        for (var i = 0; i < data.length; i++) {
            tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + data[i].id + '</td>' +
                '<td>' + data[i].section + '</td>'

            td = document.createElement("td");
            button = document.createElement("button");
            table.appendChild(tr);
        }
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}



function loadPage(call) {
    let title,button;
            appTitle.innerHTML = "";

            title = document.createElement("a");
            title.addEventListener("click",
                function() {
                    loadIndex();
                });
            title.className = "clickable text-black";
            title.innerHTML = "Home -> ";
            appTitle.appendChild(title);

            title = document.createElement("a");
            title.addEventListener("click",
                function() {
                    loadPage(2);
                });
            title.className = "clickable text-black";
            title.innerHTML = "Classi";
            appTitle.appendChild(title);

            appContainer.innerHTML = "";
            appContainer.innerHTML =  '<table class="table">'+
            '<tbody><tr><td><button class="btn btn-primary" onclick="clickGet('+call+')" type="button">Get</button></td>'+
            '<td><button class="btn btn-success" onclick="clickGet('+call+')" type="button">Post</button></td>'+
            '<td><button class="btn btn-info" onclick="clickGet('+call+')" type="button">Delete</button></td>'+
            '<td><button class="btn btn-info" onclick="clickGet('+call+')" type="button">Patch</button></td>'+
            '<td><button class="btn btn-info" onclick="clickGet('+call+')" type="button">Put</button></td>'+          
            '</tr></tbody></table>';
 
    }

    function clickGet(call)
    {
        appContainer.innerHTML = "";
        let button, title;
        title = document.createElement("a");
            title.className = "clickable text-black";
            title.innerHTML = "-> Get";
            appTitle.appendChild(title);
            
            button = document.createElement("button");
            button.addEventListener("click",
            function() {
                loadIndex(null,call);
            });
            button.className = "btn btn-primary";
            button.innerHTML = "Get All";
        appContainer.appendChild(title);

        button = document.createElement("button");
            button.addEventListener("click",
            function() {
                get(call);
            });
            button.className = "btn btn-primary";
            button.innerHTML = "Get All";
        appContainer.appendChild(button);

            button = null;
        button = document.createElement("button");
            button.addEventListener("click",
            function() {
                get(call);
            });
            button.className = "btn btn-primary";
            button.innerHTML = "Get id";
        appContainer.appendChild(button);


        button = null;
        button = document.createElement("input");
        button.id = "input";
        appContainer.appendChild(button);
        //appContainer.innerHTML += '<div id="result"/>';
}