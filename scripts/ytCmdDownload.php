<?php // 2>&1 (gets exec output [not needed])
if (file_get_contents('..\files\ytdownloads\status.txt') == 'idle') {
    $ytURL = trim($_POST['ytURL']);
    $format = $_POST['format']; // videoFormat audioFormat
    $formatId = trim($_POST['formatId']);
    
    if ($format == "audioFormat") {
        $tag = "-f 140 ";
    } else if ($format == "videoFormat") {
        $tag = "";
    }
    
    if (!empty($formatId)) {
        $tag = "-f ".$formatId." ";
    }
    
    if (!empty($_POST['embedThumbnail'])) {
        $tag .= "--embed-thumbnail ";
    }
    
    if (!empty($_POST['multithreaded'])) {
        $maxConnPerServer = $_POST['maxConnPerServer'];
        $split = $_POST['split'];
        $minSplitSize = $_POST['minSplitSize'];
        $tag .= '--external-downloader aria2c --external-downloader-args "';
        if (!empty($maxConnPerServer)) {
            $tag .= '-x '.$maxConnPerServer.' ';
        }
        if (!empty($split)) {
            $tag .= '-s '.$split.' ';
        }
        if (!empty($minSplitSize)) {
            $tag .= '-k '.$minSplitSize;
        }
        $tag .= '" ';
    }
    
    if (empty($ytURL)) {
        $ytURL = 'https://www.youtube.com/watch?v=kDJs-yV25sA';
    }
    
    file_put_contents('..\files\ytdownloads\status.txt', 'busy');
    file_put_contents('..\files\ytdownloads\stream.txt', '');
    shell_exec("echo 'Downloader updating, please wait...'");
    $cmd = '"..\files\youtube-dl\youtube-dl" -U > ..\files\ytdownloads\stream.txt &';
    shell_exec($cmd);
    $cmd = '"..\files\youtube-dl\yt-dlp" -U > ..\files\ytdownloads\stream.txt &';
    shell_exec($cmd);
    $cmd = '"..\files\youtube-dl\yt-dlp" --rm-cache-dir --restrict-filenames --get-filename --write-info-json '.$tag.'-o "..\files\ytdownloads\%(title)s.%(ext)s" '.$ytURL.' > ..\files\ytdownloads\filename.txt &';
    shell_exec($cmd);
    $cmd = '"..\files\youtube-dl\yt-dlp" --rm-cache-dir --restrict-filenames '.$tag.'-o "..\files\ytdownloads\%(title)s.%(ext)s" '.$ytURL.' > ..\files\ytdownloads\stream.txt &';
    shell_exec($cmd);
    file_put_contents('..\files\ytdownloads\status.txt', 'idle');
    header('Location: ../pages/ytDownloadCompletePg.html');
} else {
    header('Location: ../pages/ytDownloadPage.html?status=notIdel');
}

// https://www.youtube.com/watch?v=kDJs-yV25sA
// todo multitreaded download --external-downloader aria2c --external-downloader-args "-x 16 -s 16 -k 1M"
// -x --max-connection-per-server
// The maximum number of connections to one server for each download. Default: 1

// -s --split
// Download a file using N connections. If more than N URIs are given, first N URIs are used and remaining URIs are used for backup. If less than N URIs are given, those URIs are used more than once so that N connections total are made simultaneously. The number of connections to the same host is restricted by the --max-connection-per-server option. See also the --min-split-size option. Default: 5

// -k --min-split-size
//aria2 does not split less than 2*SIZE byte range. For example, let's consider downloading 20MiB file. If SIZE is 10M, aria2 can split file into 2 range [0-10MiB) and [10MiB-20MiB) and download it using 2 sources(if --split >= 2, of course). If SIZE is 15M, since 2*15M > 20MiB, aria2 does not split file and download it using 1 source. You can append K or M (1K = 1024, 1M = 1024K). Possible Values: 1M -1024M Default: 20M
?>