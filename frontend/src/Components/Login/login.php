<?php

$is_invalid = false;

if($_SERVER["REQUEST_METHOD"] === "POST"){
    //sql file
    $myqli = require __DIR__ . "/database.php";

    $sql = sprintf("SELECT * FROM user
            WHERE username = '%s'",
            $mysqli -> real_escape_string($_POST["username"]));

            $result = $mysqli -> query($sql);

            $user = $result -> fetch_assoc();

            if ($user) { 
                    session_start();
                    
                    session_regenerate_id();
                    
                    $_SESSION["user_id"] = $user["username"];
                    
                    header("Location: index.php");
                    exit;
            }

    $is_invalid = true;
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" type="text/css">
</head>
<body>

    <h1>Login</h1>
    <?php if ($is_invalid): ?>
        <em>Invalid login</em>
    <?php endif; ?>
    
    <form method="post">

        <label for="username">Username</label>
        <input type="username" name="username" id="username"
                    value="<?= htmlspecialchars($_POST["username"] ?? "")?>">

        <label for="password">Password</label>
        <input type="password" name="password" id="password">

        <p>No account? <a href="signup.html"> Click to signup</a></p>


        <button>Login</button>
        
    </form>

</body>
</html>