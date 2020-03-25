<?php
/**
 * @package Student class
 *
 * @author 
 *   
 */
 
include("DBConnection.php");
class studentClass 
{
    protected $db;
    public $_id;
    public $_student;
    public $_class;

    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
    }
 
    //insert
    public function insert() {
		/*
		Nella prima parte esegue l' aggiunta del nuovo studente
		*/
		try {
            //modificare la query per l' aggiunta delle classi
    		$sql = 'INSERT INTO student_class (id_student, id_class)  VALUES (:student, :class)';
    		$data = [
			    'student' => $this->_student,
			    'class' => $this->_class,
			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$status = $stmt->rowCount();
			//echo "a";
 
		} catch (Exception $e) {
			header("HTTP/1.1 500 Internal server error");
    		die("Oh noes! There's an error in the query!".$e);
		}

		/*
		Nella seconda parte esegue la visualizzazione del nuovo studente
		*/
		try {
    		$sql = "SELECT * FROM student_class WHERE id_student=:student and id_class=:class ";
		    $stmt = $this->db->prepare($sql);
		    $data = [
			    'student' => $this->_student,
			    'class' => $this->_class,
			];
		    $stmt->execute($data);
		    $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;

		} catch (Exception $e) {
			header("HTTP/1.1 500 Internal server error");
		    die("Oh noes! There's an error in the query!");
		}
 
    }
   
    // getAll 
    public function list() {
    	try {
    		$sql = "SELECT * FROM student_class";
		    $stmt = $this->db->prepare($sql);
 
		    $stmt->execute();
		    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
			header("HTTP/1.1 500 Internal server error");
		    die("Oh noes! There's an error in the query!");
		}
    }

    // getOne
    public function one() {
    	try {
    		$sql = "SELECT * FROM student_class WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
		    $stmt->execute($data);
		    $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
			header("HTTP/1.1 500 Internal server error");
		    die("Oh noes! There's an error in the query!");
		}
    }
 
    // delete TODO
    public function delete() {
		try {
    		$sql = "DELETE FROM student_class WHERE id= :id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
		    $stmt->execute($data);
		    return "Ok";
		} catch (Exception $e) {
			header("HTTP/1.1 500 Internal server error");
		    die("Oh noes! There's an error in the query!".$e);
		}
    }

    // put TODO
    public function put() {
		try {

            //modificare per class
    		$sql = "UPDATE student_class SET id_student = :student, id_class = :class WHERE id = :id";
		    $stmt = $this->db->prepare($sql);

				$data = [
                    'id' => $this->_id,
                    'student' => $this->_student,
			        'class' => $this->_class,
                ];
		    $stmt->execute($data);
		    return "Ok";
		} catch (Exception $e) {
			header("HTTP/1.1 500 Internal server error");
		    die("Oh noes! There's an error in the query!".$e);
		}
    }
 
    // patch TODO
    public function patch() {
		try {
			$campi="";
			if(!is_null($this->_student))
				$campi .= "id_student = :student,";

			if(!is_null($this->_class))
				$campi .= "id_class = :class,";

			$campi = rtrim($campi,",");

    		$sql = "UPDATE student_class SET ".$campi." WHERE id = :id";
			$stmt = $this->db->prepare($sql);
			
		    $data = [
				'id' => $this->_id,
			];
		if(!is_null($this->_student))
			$data['student'] = $this->_student;

		if(!is_null($this->_class))
            $data['class'] = $this->_class;
            
		echo $sql;
		$stmt->execute($data);
		    return "Ok";
		} catch (Exception $e) {
			header("HTTP/1.1 500 Internal server error");
		    die("Oh noes! There's an error in the query!".$e);
		}
    }
 
}
?>