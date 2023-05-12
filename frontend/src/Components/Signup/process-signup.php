<?php

if($_POST["password"] !== $_POST["password_confirmation"]){
    die("Passwords must match");
}

$password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);

$mysqli = require __DIR__ . "/database.php";

$sql = "INSERT INTO user(username, firstName, lastName, email, password)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $mysqli -> stmt_init();

if (! $stmt -> prepare($sql)){
    die ("SQL error: " . $mysqli -> error);
}

$stmt ->bind_param("sssss",
                   $_POST["username"],
                   $_POST["firstName"],
                   $_POST["lastName"],
                   $_POST["email"],
                   $_POST["password"]);

if ($stmt -> execute()){

    header("Location: signup-success.html");
    exit;

} else {
    
    if ($mysqli->errno === 1062){
        echo("username/email already taken");
    } else {
    die($mysqli -> error . "  " . $mysqli->errno);
    }
}
