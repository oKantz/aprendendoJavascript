<?php
// db.php
$host = 'localhost';
$user = 'root'; // Insira seu usuário do MySQL
$password = ''; // Insira sua senha do MySQL
$dbname = 'forum_militar';

$conn = new mysqli($host, $user, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
