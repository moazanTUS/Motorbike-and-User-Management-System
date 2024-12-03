<?php
require 'Slim/Slim.php';
require 'motorbikes_db.php';
require 'database.php';

use Slim\Slim;
\Slim\Slim::registerAutoloader();

$app = new Slim();

//User
$app->get('/users', 'getUsers');
$app->get('/users/:id',  'getUser');
$app->post('/users',  'addUser');
$app->put('/users/:id',  'updateUser');
$app->delete('/users/:id',  'deleteUser');

// Motorbike
$app->get('/motorbikes', 'getMotorbikes'); 
$app->get('/motorbikes/:id', 'getMotorbikeById'); 
$app->post('/motorbikes',  'addMotorbike'); 
$app->put('/motorbikes/:id',  'updateMotorbike'); 
$app->delete('/motorbikes/:id', 'deleteMotorbike'); 

$app->run();
?>
