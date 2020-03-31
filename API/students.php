<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('class/Student.php');
$student = new Student();
switch($requestMethod) {
    case 'GET'://ok

    $pathArray = explode('/', $_SERVER['REQUEST_URI']);
    if(isset($pathArray[5]))
        $id = $pathArray[5];
    else
        $id = -1;
	
		if($id != -1) {
			$student->_id = $id;
			$data = $student->one();
		} else {
            $data = $student->list();          
        }
		if(!empty($data)) {
          $js_encode = json_encode($data);
          header('Content-Type: application/json');
        header("HTTP/1.1 200 OK");
		echo $js_encode;
          
        } else {
          echo"Error";
        }
        
		break;
    
    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $student->_name = $input["name"];
        $student->_surname = $input["surname"];
        $student->_sidiCode = $input["sidiCode"];
        $student->_taxCode = $input["taxCode"];

        $data = $student->insert();
        $js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);

        header('Content-Type: application/json');
		echo $js_encode;
        break;
    case 'DELETE'://ok
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($pathArray[5]))
           { 
               $id = $pathArray[5];
               $student->_id = $id;
               echo $student->delete();
           }
        else
            echo "Errore!";
        break;
    case 'PATCH':
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(!isset($pathArray[5]))
               echo "Errore!";
        else
         {   
            $id = $pathArray[5];
            $student->_id = $id;

            //Ottiene il  json dalla richiesta
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);

            if(isset($input["name"]))
                $student->_name = $input["name"];
            else    
                $student->_name = null;

            if(isset($input["surname"]))
                $student->_surname = $input["surname"];
            else    
                $student->_surname = null;

            if(isset($input["sidiCode"]))
                $student->_sidiCode = $input["sidiCode"];
            else    
                $student->_sidiCode = null;

            if(isset($input["taxCode"]))
                $student->_taxCode = $input["taxCode"];
            else    
                $student->_taxCode = null;

            echo $student->patch();
            
         }
        break;
    case 'PUT'://ok
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(!isset($pathArray[5]))
               echo "Errore!";
        else
         {   
            $id = $pathArray[5];
            $student->_id = $id;

            //Ottiene il  json dalla richiesta
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);

            if(isset($input["name"]))
                $student->_name = $input["name"];
            else    
                $student->_name = null;

            if(isset($input["surname"]))
                $student->_surname = $input["surname"];
            else    
                $student->_surname = null;

            if(isset($input["sidiCode"]))
                $student->_sidiCode = $input["sidiCode"];
            else    
                $student->_sidiCode = null;

            if(isset($input["taxCode"]))
                $student->_taxCode = $input["taxCode"];
            else    
                $student->_taxCode = null;

            echo $student->put();
            
         }
        break;
    default:
	    header("HTTP/1.0 505 Method Not Allowed");
	    break;
}
?>	