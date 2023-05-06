<?php
$servername = "localhost";
$username = "u425772716_lruiz44";
$password = "Athenarubyvargas1!";
$dbname = "u425772716_ruizHomeDataba";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = mysqli_real_escape_string($conn, $_POST['name']);
$address = mysqli_real_escape_string($conn, $_POST['address']);
$phone_number = mysqli_real_escape_string($conn, $_POST['phone_number']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$availability = mysqli_real_escape_string($conn, $_POST['availability']);
$experience = mysqli_real_escape_string($conn, $_POST['experience']);

// Handle file upload
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["photo_proof"]["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if image file is an actual image or fake image
$check = getimagesize($_FILES["photo_proof"]["tmp_name"]);
if ($check === false) {
    die("File is not an image.");
}

// Check if file already exists
if (file_exists($target_file)) {
    die("Sorry, file already exists.");
}

// Check file size (5MB limit)
if ($_FILES["photo_proof"]["size"] > 5000000) {
    die("Sorry, your file is too large.");
}

// Allow only certain file formats (jpg, png, jpeg, gif)
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
    die("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
}

// Upload the file
if (move_uploaded_file($_FILES["photo_proof"]["tmp_name"], $target_file)) {
    $photo_proof = mysqli_real_escape_string($conn, $target_file);
} else {
    die("Sorry, there was an error uploading your file.");
}

$sql = "INSERT INTO employment_applications (name, address, phone_number, email, availability, experience, photo_proof)
VALUES ('$name', '$address', '$phone_number', '$email', '$availability', '$experience', '$photo_proof')";

if ($conn->query($sql) === TRUE) {
    echo "Application submitted successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
