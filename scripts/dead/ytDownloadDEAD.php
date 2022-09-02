<?php

declare(strict_types=1);

$ytURL = $_POST['ytURL'];

require __DIR__ . '\files\vendor\autoload.php';

use YoutubeDl\Options;
use YoutubeDl\YoutubeDl;

$yt = new YoutubeDl();

$collection = $yt-> setBinPath('C:\Files\Youtube DL\new\youtube-dl') ->download(
    Options::create()
        ->downloadPath('\files\ytDownload')
        ->url($ytURL)
);

foreach ($collection->getVideos() as $video) {
    if ($video->getError() !== null) {
        echo "Error downloading video: {$video->getError()}.";
    } else {
        echo $video->getTitle(); // Will return Phonebloks
        // $video->getFile(); // \SplFileInfo instance of downloaded file
    }
}

?>