<?php
    /** Nom de la base de données */
    define('DB_NAME', 'tunisiana');

    /** Utilisateur de la base de données MySQL. */
    define('DB_USER', 'root');

    /** Mot de passe de la base de données MySQL. */
    define('DB_PASSWORD', '');

    /** Adresse de l'hébergement MySQL. */
    define('DB_HOST', 'localhost');


    $link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD)
    or die("Impossible de se connecter : " . mysql_error());
    mysql_select_db(DB_NAME);
	
	
	echo get_cadeau();

    //echo get_cadeau();
    //echo json_encode(get_cadeau());
    function get_cadeau(){
        $date = date('Y-m-d');
		$sql = "SELECT id, description
                    FROM  `cadeaux`
                    WHERE  `date` =  '".$date."'
                    AND  `cnt` !=0
                    ORDER BY RAND()
                    LIMIT 1";
					//echo $sql;					
        $result = mysql_query($sql);
        if(mysql_num_rows( $result ) != 0){
            $row = mysql_fetch_array($result);
			mysql_query("UPDATE  cadeaux AS C SET  C.cnt =  (C.cnt - 1) WHERE  DATE =  '".$date."' AND description = '". $row['description'] ."'");
			$return = $row['description'];
		}
        else
            $return = '0';
        mysql_free_result($result);
        return $return;
    }

?>
