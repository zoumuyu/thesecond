<?php  
	
	include "conn.php";

	$result=mysql_query("select * from robampic where type='list'");
	
	$arrdata=array();
	for ($i=0; $i < mysql_num_rows($result); $i++) { 
		$arrdata[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}

	echo json_encode($arrdata);

?>