<?php

$cmd = 'taskkill /IM yt-dlp.exe /F'

shell_exec($cmd);
header('Location: ../pages/ytDownloadCompletePg.html?status=cancel');

?>