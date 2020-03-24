/*
###APP LOAD###
*/

let levelsToApp = 0; //DEBUG ONLY. Use if app.html is not at the root of the website (eg: localhost/somefolder/app.html)
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
    appContainer.innerHTML = '<table class="table"><tbody><tr><td><button class="btn btn-primary" onclick="loadPage(1)" type="button">Alunni</button></td><td><button class="btn btn-success" onclick="loadPage(2)" type="button">Classi</button></td><td><button class="btn btn-info" onclick="loadPage(3)" type="button">Allocazione alunni</button></td></tr></tbody></table>';
}


function get(call)
{
    var getUrl;
    var id = document.getElementById("input").value;
    switch(call)
    {
        case 1:
             getUrl = 'http://localHost/phpServer/API/students.php';
            break;
        case 2:
             getUrl = 'http://localHost/phpServer/API/classes.php';
            break;
        case 3:
             getUrl = 'http://localHost/phpServer/API/studentsClasses.php';
                break;
    }
    

    if(id != "")
        getUrl+="/"+id;
    
        appResult.innerHTML="";
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        table.setAttribute("class", "table");
        thead.className = "thead-dark";
        table.appendChild(thead);
        appResult.appendChild(table);
    
        var tr = document.createElement('tr');
        tr.innerHTML =
            '<th>id</th>' +
            '<th>Sezione</th>' ;
        thead.appendChild(tr);



    var xhr = new XMLHttpRequest();
    xhr.open("GET", getUrl, true);
    xhr.onload = function() {
        var data = JSON.parse(xhr.response);
        
        let tr, td, button;
        if(id != "")
        {
            tr = document.createElement('tr');
            tr.innerHTML = 
            '<td>' + data.id + '</td>' +
                '<td>' + data.section + '</td>'
            

            td = document.createElement("td");
            button = document.createElement("button");
            table.appendChild(tr);
        }
        else{
        for (var i = 0; i < data.length; i++) {
            tr = document.createElement('tr');

                tr.innerHTML = '<td>' + data[i].id + '</td>' +
                '<td>' + data[i].section + '</td>'
            

            td = document.createElement("td");
            button = document.createElement("button");
            table.appendChild(tr);
        }
    }
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}

function post(call)
{
    var myJSON
    switch(call)
    {
        case 1:
             getUrl = 'http://localHost/phpServer/API/students.php';
             var name = document.getElementById("nome").value;
             var surname = document.getElementById("cognome").value;
             var taxCode = document.getElementById("taxCode").value;
             var sidiCode = document.getElementById("sidiCode").value;
             var obj = { section: section, year: year};
              myJSON = JSON.stringify(obj);
            break;
        case 2:
             getUrl = 'http://localHost/phpServer/API/classes.php';
             var section = document.getElementById("sezione").value;
             var year = document.getElementById("anno").value;
             var obj = { section: section, year: year};
              myJSON = JSON.stringify(obj);
            break;
        case 3:
             getUrl = 'http://localHost/phpServer/API/studentsClasses.php';
                break;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", getUrl, true);
    xhr.onload = function() {
        alert(xhr.response);
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send(myJSON);
}


function del(call)
{
    var myJSON
    var id = document.getElementById("idDel").value;
    switch(call)
    {
        case 1:
             getUrl = 'http://localHost/phpServer/API/students.php/'+id;
            break;
        case 2:
             getUrl = 'http://localHost/phpServer/API/classes.php/'+id;
            break;
        case 3:
             getUrl = 'http://localHost/phpServer/API/studentsClasses.php/'+id;
                break;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", getUrl, true);
    xhr.onload = function() {
        alert(xhr.response);
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
            title.innerHTML = "Home";
            appTitle.appendChild(title);

            appContainer.innerHTML = "";
            appContainer.innerHTML =  '<table class="table">'+
            '<tbody><tr><td><button class="btn btn-primary" onclick="clickGet('+call+')" type="button">Get</button></td>'+
            '<td><button class="btn btn-success" onclick="clickPost('+call+')" type="button">Post</button></td>'+
            '<td><button class="btn btn-info" onclick="clickDelete('+call+')" type="button">Delete</button></td>'+
            '<td><button class="btn btn-info" onclick="clickGet('+call+')" type="button">Patch</button></td>'+
            '<td><button class="btn btn-info" onclick="clickGet('+call+')" type="button">Put</button></td>'+          
            '</tr></tbody></table>';
 
    }

    function clickGet(call)
    {
        appContainer.innerHTML = "";
        let button;

            
            button = document.createElement("button");
            button.addEventListener("click",
            function() {
                get(call);
            });
            button.className = "btn btn-primary";
            button.innerHTML = "Get";
        appContainer.appendChild(button);
        button = null;
        button = document.createElement("input");
        button.id = "input";
        appContainer.appendChild(button);
        //appContainer.innerHTML += '<div id="result"/>';
}

function clickPost(call)
{
    appContainer.innerHTML = "";
    let button;

    button = document.createElement("label");
    button.innerHTML ="Nome classe";
    appContainer.appendChild(button);
    button = null;
    button = document.createElement("input");
    button.id = "sezione";
    appContainer.appendChild(button);
    button = null;
    button = document.createElement("label");
    button.innerHTML ="Anno classe";
    appContainer.appendChild(button);
    button = null;
    button = document.createElement("input");
    button.id = "anno";
    appContainer.appendChild(button);

        button = null;
    button = document.createElement("button");
        button.addEventListener("click",
        function() {
            post(call);
        });
        button.className = "btn btn-primary";
        button.innerHTML = "Aggiungi";
    appContainer.appendChild(button);

    //appContainer.innerHTML += '<div id="result"/>';
}

function clickDelete(call)
{
    appContainer.innerHTML = "";
    let button;

    
    button = document.createElement("label");
    button.innerHTML ="Id classe";
    appContainer.appendChild(button);
    button = null;

    button = document.createElement("input");
    button.id = "idDel";
    appContainer.appendChild(button);
        button = null;
    button = document.createElement("button");
        button.addEventListener("click",
        function() {
            del(call);
        });
        button.className = "btn btn-primary";
        button.innerHTML = "Get id";
    appContainer.appendChild(button);

    //appContainer.innerHTML += '<div id="result"/>';
}