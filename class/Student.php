<?php
/**
 * @package Student class
 *
 * @author 
 *   
 */
 
include("DBConnection.php");
class Student 
{
    protected $db;
    public $_id;
    public $_name;
    public $_surname;
    public $_sidiCode;
    public $_taxCode;
 
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
    		$sql = 'INSERT INTO student (name, surname, sidi_Code, tax_Code)  VALUES (:name, :surname, :sidiCode, :taxCode)';
    		$data = [
			    'name' => $this->_name,
			    'surname' => $this->_surname,
			    'sidiCode' => $this->_sidiCode,
			    'taxCode' => $this->_taxCode,
			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$status = $stmt->rowCount();
			echo "a";
 
		} catch (Exception $e) {
    		die("Oh noes! There's an error in the query!".$e);
		}

		/*
		Nella seconda parte esegue la visualizzazione del nuovo studente
		*/
		try {
    		$sql = "SELECT * FROM student WHERE sidi_Code=:sidiCode";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'sidiCode' => $this->_sidiCode
			];
		    $stmt->execute($data);
		    $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!");
		}
 
    }
   
    // getAll 
    public function list() {
    	try {
    		$sql = "SELECT * FROM student";
		    $stmt = $this->db->prepare($sql);
 
		    $stmt->execute();
		    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!");
		}
    }

    // getOne
    public function one() {
    	try {
    		$sql = "SELECT * FROM student WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
		    $stmt->execute($data);
		    $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!");
		}
    }
 
    // delete TODO
    public function delete() {
		try {
    		$sql = "DELETE FROM student WHERE id= :id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
		    $stmt->execute($data);
		    return "Ok";
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!".$e);
		}
    }

    // put TODO
    public function put() {
    }
 
    // patch TODO
    public function patch() {
		try {
    		$sql = "UPDATE student SET name = :name, surname = :surname, sidi_Code = :sidiCode, tax_Code = :taxCode WHERE id = :id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
				'id' => $this->_id,
			    'name' => $this->_name,
			    'surname' => $this->_surname,
			    'sidiCode' => $this->_sidiCode,
			    'taxCode' => $this->_taxCode,
			];
		    $stmt->execute($data);
		    return "Ok";
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!".$e);
		}
    }
 
}
?>