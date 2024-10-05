<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Registrar - Mili41</title>
</head>
<body>
    <header>
        <h1>Registrar - Mili41</h1>
    </header>
    <div class="container">
        <form method="POST" action="register.php">
            <input type="text" name="username" placeholder="Nome de usuário" required>
            <input type="password" name="password" placeholder="Senha" required>
            <button type="submit">Registrar</button>
        </form>
        <a href="login.php">Já tem uma conta? Faça login</a>
    </div>

    <?php
    include 'db.php';
    
    // Processar o registro
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Criptografa a senha
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insere o novo usuário no banco de dados
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $hashed_password);
        
        if ($stmt->execute()) {
            echo "Registro concluído com sucesso!";
            // Redirecionar ou logar o usuário aqui
        } else {
            echo "Erro: " . $stmt->error;
        }
    }
    ?>
</body>
</html>
