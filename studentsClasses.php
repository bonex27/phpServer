<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('./class/studentClass.php');
$studentClasses = new studentClass();
switch($requestMethod) {
    case 'GET'://ok

        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($pathArray[3]))
            $id = $pathArray[3];
        else
            $id = -1;
        
            if($id != -1) {

                $studentClasses->_id = $id;
                $data = $studentClasses->one();

            } else {
                $data = $studentClasses->list();          
            }
            
            if(!empty($data)) {
              $js_encode = json_encode(array($data), true);
            } else {
              $js_encode = json_encode(array('status'=>FALSE, 'message'=>'There is no record yet.'), true);
            }
            header('Content-Type: application/json');
            echo $js_encode;
		break;
    
    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $studentClasses->_student = $input["student"];
        $studentClasses->_class = $input["class"];

        $data = $studentClasses->insert();
        $js_encode = json_encode(array($data), true);

        header('Content-Type: application/json');
		echo $js_encode;
        break;
        break;
    case 'DELETE':
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($pathArray[3]))
           { 
               $studentClasses->_id = $pathArray[3];
               echo $studentClasses->delete();
           }
        else
            echo "Errore!";
        break;
        break;
    case 'PATCH':
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(!isset($pathArray[3]))
               echo "Errore!";
        else
         {   
            $studentClasses->_id = $pathArray[3];

            //Ottiene il  json dalla richiesta
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);

            if(isset($input["student"]))
                $studentClasses->_student = $input["student"];
            else    
                $studentClasses->_student = null;

            if(isset($input["class"]))
                $studentClasses->_class = $input["class"];
            else    
                $studentClasses->_class = null;

            

            echo $studentClasses ->patch();
            
         }
        break;
    case 'PUT':
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(!isset($pathArray[3]))
               echo "Errore!";
        else
         {   
            $studentClasses->_id = $pathArray[3];

            //Ottiene il  json dalla richiesta
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);
            if(isset($input["student"]))
            $studentClasses->_student = $input["student"];
        else    
            $studentClasses->_student = null;

        if(isset($input["class"]))
            $studentClasses->_class = $input["class"];
        else    
            $studentClasses->_class = null;

            echo $studentClasses->put();
            
         }
        break;
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	