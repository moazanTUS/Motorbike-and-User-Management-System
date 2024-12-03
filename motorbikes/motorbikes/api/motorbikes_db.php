<?php




function getMotorbikes() {
    $query = "SELECT * FROM motorbikes ORDER BY name";
    try {
        global $db;
        $motorbikes = $db->query($query);
        $motorbikes = $motorbikes->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"motorbikes": ' . json_encode($motorbikes) . '}';
    } catch (PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getMotorbikeById($id) {
    $query = "SELECT * FROM motorbikes WHERE id = '$id'";
    try {
        global $db;
        $motorbike = $db->query($query);
        $motorbike = $motorbike->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo json_encode($motorbike);
    } catch (PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addMotorbike() {
    global $app;
    $request = $app->request();
    $motorbike = json_decode($request->getBody());
    $name = $motorbike->name;
    $make = $motorbike->make;
    $model = $motorbike->model;
    $year = $motorbike->year; // Include the year field.
    $colour = $motorbike->colour;
    $type = $motorbike->type;
    $cc = $motorbike->cc;
    
    $query = "INSERT INTO motorbikes (name, make, model, year, colour, type, cc) VALUES ('$name', '$make', '$model', '$year', '$colour', '$type', '$cc')";
    try {
        global $db;
        $db->exec($query);
        $motorbike->id = $db->lastInsertId();
        echo json_encode($motorbike);
    } catch (PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function deleteMotorbike($id) {
    $query = "DELETE FROM motorbikes WHERE id=:id";
    try {
        global $db;
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
    } catch (PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateMotorbike($id) {
    global $app;
    $request = $app->request();
    $motorbike = json_decode($request->getBody());
    $name = $motorbike->name;
    $make = $motorbike->make;
    $model = $motorbike->model;
    $year = $motorbike->year;
    $colour = $motorbike->colour;
    $type = $motorbike->type;
    $cc = $motorbike->cc;

    $query = "UPDATE motorbikes SET name='$name', make='$make', model='$model', year='$year', colour='$colour', type='$type', cc='$cc' WHERE id='$id'";
    try {
        global $db;
        $db->exec($query);
        echo json_encode($motorbike);
    } catch (PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getUsers() {
    $query = "SELECT * FROM users";
    try {
        global $db;
        $users = $db->query($query);
        $users = $users->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo '{"users": ' . json_encode($users) . '}';
    } catch (PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getUser($id) {
    $query = "SELECT * FROM users WHERE id = '$id'";
    try {
        global $db;
        $user = $db->query($query);
        $user = $user->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        echo json_encode($user);
    } catch (PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addUser() {
    global $db;

    $input = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (!isset($input['name'], $input['username'], $input['password'], $input['image'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Invalid input: Missing required fields']);
        return;
    }

    $name = $input['name'];
    $username = $input['username'];
    $password = $input['password'];
    $image = $input['image'];

    $query = "INSERT INTO users (name, username, password, image) VALUES (:name, :username, :password, :image)";

    try {
        $stmt = $db->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':image', $image);
        $stmt->execute();

        $input['id'] = $db->lastInsertId(); // Add ID to response
        echo json_encode($input);
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => $e->getMessage()]);
    }
}




function deleteUser($id) {
    $query = "DELETE FROM users WHERE id=:id";
    try {
        global $db;
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
    } catch (PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateUser($id) {
    global $app;
    $request = $app->request();
    $user = json_decode($request->getBody());
    $name = $user->name;
    $username = $user->username;
    $password = $user->password;
    $image = $user->image;

    $query = "UPDATE users SET name='$name', username='$username', password='$password', image='$image' WHERE id='$id'";
    try {
        global $db;
        $db->exec($query);
        echo json_encode($user);
    } catch (PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
?>
