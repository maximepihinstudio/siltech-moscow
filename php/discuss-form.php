<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once 'mail.php';

$postData = $_POST;
$a = 1;

/** @var PHPMailer $mail */

// Кому
$mail->addAddress('', '');
// Тема письма
$mail->Subject = 'Обсуждение проекта/Связь с менеджером';
// Тело письма
$body = "
<p><strong>Имя:</strong> {$postData['clientName']}</p>
<p><strong>Телефон:</strong> {$postData['clientPhone']}</p>
";
$mail->msgHTML($body);
$mail->send();

if ($mail->isError()) {
	throw new Exception($mail->ErrorInfo);
}
