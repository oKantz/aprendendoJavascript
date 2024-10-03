<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "military_forum";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['post_id'])) {
    $post_id = intval($_POST['post_id']);

    $sql = "DELETE FROM posts WHERE id = $post_id";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.php"); 
        exit();
    } else {
        echo "Error deleting post: " . $conn->error;
    }
}

$conn->close();
?>
