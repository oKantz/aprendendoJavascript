<!-- index.php -->
<?php
session_start();
include 'db.php';

// Adicionar uma nova postagem
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_SESSION['user_id'])) {
    $content = $_POST['content'];
    $user_id = $_SESSION['user_id'];
    $image = null;

    // Verifica se há imagem para upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $targetDir = "uploads/";
        $targetFile = $targetDir . basename($_FILES['image']['name']);
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

        // Verifica o tipo de arquivo
        if (in_array($imageFileType, $allowedTypes)) {
            // Move a imagem para o diretório de uploads
            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                $image = $targetFile;
            }
        }
    }

    $stmt = $conn->prepare("INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $content, $image);
    $stmt->execute();
}

// Excluir uma postagem
if (isset($_GET['delete']) && isset($_SESSION['user_id'])) {
    $post_id = $_GET['delete'];

    // Verifica se a postagem pertence ao usuário logado
    $stmt = $conn->prepare("SELECT user_id FROM posts WHERE id = ?");
    $stmt->bind_param("i", $post_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $post = $result->fetch_assoc();

    if ($post && $post['user_id'] == $_SESSION['user_id']) {
        // Remove a imagem do servidor
        $stmt = $conn->prepare("SELECT image FROM posts WHERE id = ?");
        $stmt->bind_param("i", $post_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $post_image = $result->fetch_assoc();

        if ($post_image['image']) {
            unlink($post_image['image']); // Remove a imagem do servidor
        }

        // Exclui a postagem
        $stmt = $conn->prepare("DELETE FROM posts WHERE id = ?");
        $stmt->bind_param("i", $post_id);
        $stmt->execute();
    }
}

// Obter todas as postagens
$posts = $conn->query("SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY created_at DESC");
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Mili41 - Fórum Militar</title>
</head>
<body>
    <header>
        <h1>Mili41 - Fórum Militar</h1>
        <nav>
            <?php if (isset($_SESSION['username'])): ?>
                <span>Bem-vindo, <?php echo $_SESSION['username']; ?>!</span>
                <a href="logout.php">Logout</a>
            <?php else: ?>
                <a href="login.php">Login</a>
                <a href="register.php">Registrar</a>
            <?php endif; ?>
        </nav>
    </header>
    <div class="container">
        <h2>Postagens</h2>
        <form method="POST" enctype="multipart/form-data">
            <textarea name="content" placeholder="Escreva sua mensagem..." required></textarea>
            <input type="file" name="image" accept="image/*">
            <button type="submit">Postar</button>
        </form>
        <div class="posts">
            <?php while ($post = $posts->fetch_assoc()): ?>
                <div class="post">
                    <p><strong><?php echo $post['username']; ?></strong>: <?php echo $post['content']; ?></p>
                    <?php if ($post['image']): ?>
                        <img src="<?php echo $post['image']; ?>" alt="Imagem do post" class="post-image">
                    <?php endif; ?>
                    <small><?php echo $post['created_at']; ?></small>
                    <?php if (isset($_SESSION['user_id']) && $post['user_id'] == $_SESSION['user_id']): ?>
                        <a href="?delete=<?php echo $post['id']; ?>" onclick="return confirm('Tem certeza que deseja excluir esta postagem?');">Excluir</a>
                    <?php endif; ?>
                </div>
            <?php endwhile; ?>
        </div>
    </div>
</body>
</html>
