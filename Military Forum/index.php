<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Military Forum</title>
    <link rel="stylesheet" href="styles.css"> <!-- Optional: add a stylesheet -->
</head>
<body>
    <h1>Military Forum</h1>
    
    <!-- Form to submit posts -->
    <form action="submit_post.php" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" rows="4" cols="50" required></textarea><br><br>
        
        <input type="submit" value="Post Message">
    </form>

    <!-- Display posts -->
    <h2>Discussion Board</h2>
    <div id="posts">
        <?php
            include 'get_posts.php';  // This file will fetch and display the posts
        ?>
    </div>
</body>
</html>
