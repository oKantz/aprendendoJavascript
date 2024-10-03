<?php
session_start(); // Start the session
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "military_forum"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch posts from the database
$sql = "SELECT posts.id, posts.username, posts.message, posts.post_time FROM posts ORDER BY post_time DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='post'>";
        echo "<strong>" . htmlspecialchars($row["username"]) . "</strong> at " . $row["post_time"] . "<br>";
        echo "<p>" . htmlspecialchars($row["message"]) . "</p>";
        
        // Show delete button only for the logged-in user's posts
        if (isset($_SESSION['username']) && $_SESSION['username'] === $row["username"]) {
            echo "<div class='delete-button'>";
            echo "<form action='delete_post.php' method='POST'>";
            echo "<input type='hidden' name='post_id' value='" . $row["id"] . "'>";
            echo "<input type='submit' value='Delete' onclick='return confirm(\"Are you sure you want to delete this post?\");'>";
            echo "</form>";
            echo "</div>";
        }
        echo "</div><hr>";
    }
} else {
    echo "No posts yet!";
}

$conn->close();
?>
