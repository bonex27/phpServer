<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('./class/class.php');
$classes = new classes();
switch($requestMethod) {
    case 'GET'://ok

    $pathArray = explode('/', $_SERVER['REQUEST_URI']);
    if(isset($pathArray[4]))
        $id = $pathArray[4];
    else
        $id = -1;
	
		if($id != -1) {
			$classes->_id = $id;
			$data = $classes->one();
		} else {
            $data = $classes->list();          
        }
        
		if(!empty($data)) {
          $js_encode = json_encode($data);
        } else {
          $js_encode = json_encode(array('status'=>FALSE, 'message'=>'There is no record yet.'), true);
        }
        header('Content-Type: application/json');
        header("HTTP/1.1 200 OK");
		echo $js_encode;
		break;
    
    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $classes->_year = $input["year"];
        $classes->_section = $input["section"];

        $data = $classes->insert();
        $js_encode = json_encode(array('status'=>TRUE, 'classesInfo'=>$data), true);

        header('Content-Type: application/json');
        header("HTTP/1.1 200 OK");
		echo $js_encode;
        break;
    case 'DELETE':
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($pathArray[4]))
           { 
               $id = $pathArray[4];
               $classes->_id = $id;
               echo $classes->delete();
               header("HTTP/1.1 200 OK");
           }
        else
            echo "Errore!";
        break;
    case 'PATCH':
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(!isset($pathArray[4]))
               echo "Errore!";
        else
         {   
            $id = $pathArray[4];
            $classes->_id = $id;

            //Ottiene il  json dalla richiesta
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);

            if(isset($input["year"]))
                $classes->_year = $input["year"];
            else    
                $classes->_year = null;

            if(isset($input["section"]))
                $classes->_section = $input["section"];
            else    
                $classes->_section = null;

            

            echo $classes ->patch();
            header("HTTP/1.1 200 OK");
         }
        break;
    case 'PUT':
        $pathArray = explode('/', $_SERVER['REQUEST_URI']);
        if(!isset($pathArray[4]))
               echo "Errore!";
        else
         {   
            $id = $pathArray[4];
            $classes->_id = $id;

            //Ottiene il  json dalla richiesta
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);
            if(isset($input["year"]))
                $classes->_year = $input["year"];
            else    
                $classes->_year = null;
            if(isset($input["section"]))
                $classes->_section = $input["section"];
            else    
                $classes->_section = null;

            echo $classes->put();
            header("HTTP/1.1 200 OK");
         }
        break;
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	