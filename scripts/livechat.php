<?php
date_default_timezone_set("America/New_York");
$input = trim($_POST['input']);
$name = trim($_POST['name']);
$timestamp = date("h:ia");
file_put_contents('..\files\livechat\livechat.txt', '<br><span class="chat_name">'.$name.'</span> <span class="chat_timestamp"><'.$timestamp.'></span><br>'.'<span class="chat_text">'.$input.'</span><br>', FILE_APPEND);
?>