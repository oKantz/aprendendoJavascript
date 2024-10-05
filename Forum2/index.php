<?php
session_start();
include 'db.php';

// Adicionar uma nova postagem
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_SESSION['user_id'])) {
    $content = $_POST['content'];
    $user_id = $_SESSION['user_id'];
    $media = null;
    $mediaType = null; // Indica se é imagem ou vídeo

    // Verifica se há arquivo (imagem ou vídeo) para upload
    if (!empty($_FILES['media']['name'])) {
        if (isset($_FILES['media']) && $_FILES['media']['error'] == 0) {
            $targetDir = "uploads/";
            $targetFile = $targetDir . basename($_FILES['media']['name']);
            $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
            $allowedImageTypes = ['jpg', 'jpeg', 'png', 'gif'];
            $allowedVideoTypes = ['mp4', 'avi', 'mov'];

            // Verifica o tipo de arquivo (imagem ou vídeo)
            if (in_array($fileType, $allowedImageTypes)) {
                // Processa como imagem
                if (move_uploaded_file($_FILES['media']['tmp_name'], $targetFile)) {
                    $media = $targetFile;
                    $mediaType = 'image';
                }
            } elseif (in_array($fileType, $allowedVideoTypes)) {
                // Processa como vídeo
                if (move_uploaded_file($_FILES['media']['tmp_name'], $targetFile)) {
                    $media = $targetFile;
                    $mediaType = 'video';
                }
            }
        }
    }

    // Prepare e execute a consulta para adicionar a nova postagem
    $stmt = $conn->prepare("INSERT INTO posts (user_id, content, media, media_type) VALUES (?, ?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("isss", $user_id, $content, $media, $mediaType);
        $stmt->execute();
    } else {
        echo "Erro na preparação da consulta: " . $conn->error;
    }
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
        // Remove o arquivo de mídia do servidor (se existir)
        $stmt = $conn->prepare("SELECT media FROM posts WHERE id = ?");
        $stmt->bind_param("i", $post_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $post_media = $result->fetch_assoc();

        if ($post_media['media']) {
            unlink($post_media['media']); // Remove o arquivo do servidor
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
            <input type="file" name="media" accept="image/*,video/*">
            <button type="submit">Postar</button>
        </form>
        <div class="posts">
            <?php while ($post = $posts->fetch_assoc()): ?>
                <div class="post">
                    <p><strong><?php echo $post['username']; ?></strong>: <?php echo $post['content']; ?></p>
                    <?php if ($post['media']): ?>
                        <?php if ($post['media_type'] == 'image'): ?>
                            <img src="<?php echo $post['media']; ?>" alt="Imagem do post" class="post-image">
                        <?php elseif ($post['media_type'] == 'video'): ?>
                            <video controls class="post-video">
                                <source src="<?php echo $post['media']; ?>" type="video/<?php echo pathinfo($post['media'], PATHINFO_EXTENSION); ?>">
                                Seu navegador não suporta o elemento de vídeo.
                            </video>
                        <?php endif; ?>
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
