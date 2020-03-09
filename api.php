<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('./class/Student.php');
$student = new Student();
switch($requestMethod) {
    case 'GET'://ok

    $pathArray = explode('/', $_SERVER['REQUEST_URI']);
    if(isset($pathArray[3]))
        $id = $pathArray[3];
    else
        $id = -1;
	
		if($id != -1) {
			$student->_id = $id;
			$data = $student->one();
		} else {
            $data = $student->list();          
        }
        
		if(!empty($data)) {
          $js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);
        } else {
          $js_encode = json_encode(array('status'=>FALSE, 'message'=>'There is no record yet.'), true);
        }
        header('Content-Type: application/json');
		echo $js_encode;
		break;
    
    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $student->_name = $input["name"];
        $student->_surname = $input["surname"];
        $student->_sidiCode = $input["sidicode"];
        $student->_taxCode = $input["taxcode"];

        $data = $student->insert();
        $js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);

        header('Content-Type: application/json');
		echo $js_encode;
        break;
    case 'DELETE':
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($pathArray[3]))
           { 
               $id = $pathArray[3];
               $student->_id = $id;
               echo $student->delete();
           }
        else
            echo "Errore!";
        break;
    case 'PATCH':
        //TODO patch json_decode
        break;
    case 'PUT':
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(!isset($pathArray[3]))
               echo "Errore!";
        else
         {   
            $id = $pathArray[3];
            $student->_id = $id;

            //Ottiene il  json dalla richiesta
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);

            $student->_name = $input["name"];
            $student->_surname = $input["surname"];
            $student->_sidiCode = $input["sidicode"];
            $student->_taxCode = $input["taxcode"];

            echo $student->patch();
            
         }
        break;
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	