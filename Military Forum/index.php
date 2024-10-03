<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles.css"> <!-- Link to the CSS file -->
    <title>Military Forum</title>
</head>
<body>
    <h1>Welcome to the Military Forum</h1>

    <?php
    session_start(); // Start the session

    // Display login or logout options
    if (isset($_SESSION['username'])) {
        echo "<h3>Hello, " . htmlspecialchars($_SESSION['username']) . "!</h3>";
        echo "<a href='logout.php'>Logout</a>";
    } else {
        echo "<a href='login.php'>Login</a> | <a href='register.php'>Register</a>";
    }
    ?>

    <h2>Posts</h2>

    <?php
    // Database connection
    $servername = "localhost";
    $db_username = "root"; // Your MySQL username
    $db_password = ""; // Your MySQL password
    $dbname = "military_forum"; // Your database name

    $conn = new mysqli($servername, $db_username, $db_password, $dbname);
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
        echo "<p>No posts yet!</p>";
    }

    // Display post form if user is logged in
    if (isset($_SESSION['username'])) {
        ?>
        <h2>Post a Message</h2>
        <form action="submit_post.php" method="POST">
            <textarea name="message" rows="4" cols="50" required placeholder="Type your message here..."></textarea><br>
            <input type="submit" value="Post Message">
        </form>
        <?php
    } else {
        echo "<p>You must be <a href='login.php'>logged in</a> to post messages.</p>";
    }

    $conn->close();
    ?>
</body>
</html>
