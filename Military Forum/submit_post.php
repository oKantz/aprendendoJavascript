<?php
session_start();
$servername = "localhost";
$db_username = "root"; // Your MySQL username
$db_password = ""; // Your MySQL password
$dbname = "military_forum"; // Your database name

$conn = new mysqli($servername, $db_username, $db_password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the user is logged in
if (isset($_SESSION['username']) && $_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_SESSION['username'];
    $message = $conn->real_escape_string($_POST['message']);
    $post_time = date("Y-m-d H:i:s"); // Get the current time

    // Insert the new post into the database
    $sql = "INSERT INTO posts (username, message, post_time) VALUES ('$username', '$message', '$post_time')";
    
    if ($conn->query($sql) === TRUE) {
        // Redirect to index.php after successful post submission
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    // If the user is not logged in, redirect to login
    header("Location: login.php");
    exit();
}

$conn->close();
?>
