<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once 'mail.php';

$postData = $_POST;
$a = 1;

$fieldsMap = [
	'customerEmail' => 'Электронная почта',
	'customerTelegram' => 'Telegram',
	'technicalTaskCheckbox' => 'Наличие технического задания',
	'projectConception' => 'Концепция проекта',
	'projectTerms' => 'Срок',
	'projectBudget' => 'Бюджет'
];

/** @var PHPMailer $mail */

// Кому
$mail->addAddress('mail@site.com', 'Иван Петров');

// Тема письма
$mail->Subject = 'Обсуждение проекта/Связь с менеджером';

$body = '';

foreach ($postData as $field => $datum) {
	$body.= "<p><strong>{$fieldsMap[$field]}:</strong> {$datum}</p>";
}

$mail->msgHTML($body);

// Приложение
$mail->addAttachment(__DIR__ . '/image.jpg');

$mail->send();

if ($mail->isError()) {
	throw new Exception($mail->ErrorInfo);
}