<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "military_forum";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert post into database
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = $conn->real_escape_string($_POST['username']);
    $message = $conn->real_escape_string($_POST['message']);

    $sql = "INSERT INTO posts (username, message) VALUES ('$user', '$message')";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.html"); // Redirect to the main page
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
