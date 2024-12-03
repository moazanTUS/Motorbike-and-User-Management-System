<?php
    $dsn = 'mysql:host=127.0.0.1:3309;dbname=webdev3_2024';
    $username = 'root';
    $password = '';
    
   // echo 'connected to db';

    try {
        $db = new PDO($dsn, $username, $password);
    } catch (PDOException $e) {
       $error_message = $e->getMessage();
        include('database_error.php');
        exit();
    }
?>