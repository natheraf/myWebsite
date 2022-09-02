<?php
$ytURL = $_POST['ytURL'];

if (empty($ytURL)) {
    $ytURL = 'https://www.youtube.com/watch?v=kDJs-yV25sA';
}

$cmd = '"..\files\youtube-dl\yt-dlp" -F '.$ytURL.' > ..\files\ytdownloads\formatOut.txt &';
shell_exec($cmd);

header('Location: ../pages/ytDownloadPage.html?status=formatted');
?>
