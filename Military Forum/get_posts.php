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

// Fetch posts from the database
$sql = "SELECT username, message, post_time FROM posts ORDER BY post_time DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<div class='post'>";
        echo "<strong>" . $row["username"] . "</strong> at " . $row["post_time"] . "<br>";
        echo "<p>" . $row["message"] . "</p>";
        echo "</div><hr>";
    }
} else {
    echo "No posts yet!";
}

$conn->close();
?>
