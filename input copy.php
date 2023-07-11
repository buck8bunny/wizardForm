<?php
if (isset($_POST["firstName"]) && isset($_POST["lastName"]) && isset($_POST["birthday"]) && isset($_POST["report"]) && isset($_POST["country"]) && isset($_POST["phone"]) && isset($_POST["email"])) {
      
    $conn = new mysqli("localhost", "root", "root", "test");
    if($conn->connect_error){
        die("Ошибка: " . $conn->connect_error);
    }

    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INTEGER AUTO_INCREMENT PRIMARY KEY, 
        fullname VARCHAR(60), 
        date_of_birth DATE, 
        report VARCHAR(30), 
        country VARCHAR(20),
        phone VARCHAR(20),
        email VARCHAR(30),
        file_name VARCHAR(100),
        uploaded_on DATETIME
    );";

    $conn->query($sql);

    $fullname = $conn->real_escape_string($_POST["firstName"]) . " " . $conn->real_escape_string($_POST["lastName"]);
    $date_of_birth = $conn->real_escape_string($_POST["birthday"]);
    $date_of_birth = str_replace(" ", '', $date_of_birth);
    $dateObj = DateTime::createFromFormat('d-m-Y', $date_of_birth);
    $dateFormatted = $dateObj->format('Y-m-d');
    $report = $conn->real_escape_string($_POST["report"]);
    $country = $conn->real_escape_string($_POST["country"]);
    $phone = $conn->real_escape_string($_POST["phone"]);
    $phone = "+" . preg_replace('/[^0-9]/', '', $phone);
    $email = $conn->real_escape_string($_POST["email"]); 
    $statusMsg = '';

    // File upload path
    $targetDir = "uploads/";
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    if(isset($_POST["submit"]) && !empty($_FILES["file"]["name"])){
        // Allow certain file formats
        $allowTypes = array('jpg', 'png', 'jpeg', 'gif');
        if(in_array($fileType, $allowTypes)){
            // Upload file to server
            if(move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)){
                // Insert image file name into database
                $sql = "INSERT INTO users (fullname, report, date_of_birth, country, phone, email, file_name) VALUES ('$fullname', '$report', '$dateFormatted', '$country', '$phone', '$email', '$fileName')";

                if($conn->query($sql)){
                    $statusMsg = "The file ".$fileName. " has been uploaded successfully.";
                }else{
                    $statusMsg = "File upload failed, please try again.";
                }
            }else{
                $statusMsg = "Sorry, there was an error uploading your file.";
            }
        }else{
            $statusMsg = 'Sorry, only JPG, JPEG, PNG, GIF files are allowed to upload.';
        }
    }else{
        $statusMsg = 'Please select a file to upload.';
    }
    echo $statusMsg;
    if($conn->query($sql)){
        echo "Данные успешно добавлены";
    }else{
        echo "Ошибка: " . $conn->error;
    }
    $conn->close();
}
?>
