<?php

declare(strict_types=1);

/* =========================
    JSON RESPONSE
========================= */

header('Content-Type: application/json; charset=utf-8');

/* =========================
    ONLY POST
========================= */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido.'
    ]);

    exit;
}

/* =========================
    HONEYPOT
========================= */

if (!empty($_POST['company'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Spam detectado.'
    ]);

    exit;
}

/* =========================
    SANITIZATION
========================= */

function clean_input(string $value): string
{
    $value = trim($value);

    $value = strip_tags($value);

    $value = str_replace(
        ["\r", "\n", "%0a", "%0d"],
        '',
        $value
    );

    return htmlspecialchars(
        $value,
        ENT_QUOTES,
        'UTF-8'
    );
}

$name = clean_input($_POST['name'] ?? '');

$phone = clean_input($_POST['phone'] ?? '');

$service = clean_input($_POST['service'] ?? '');

$message = clean_input($_POST['message'] ?? '');

/* =========================
    VALIDATION
========================= */

if (
    empty($name) ||
    empty($phone) ||
    empty($service)
) {
    echo json_encode([
        'success' => false,
        'message' => 'Preencha os campos obrigatórios.'
    ]);

    exit;
}

if (mb_strlen($name) < 3) {
    echo json_encode([
        'success' => false,
        'message' => 'Nome inválido.'
    ]);

    exit;
}

/* =========================
    EMAIL CONFIG
========================= */

$clinicEmail = 'SEUEMAIL@GMAIL.COM';

/* =========================
    EMAIL CONTENT
========================= */

$subject = 'Novo agendamento - VL Estética & Fisioterapia';

$emailContent = "
Novo contato recebido pelo site:

Nome: {$name}

Telefone: {$phone}

Serviço: {$service}

Mensagem:
{$message}
";

/* =========================
    EMAIL HEADERS
========================= */

$headers = [
    'From: VL Site <no-reply@vlestetica.com>',
    'Reply-To: no-reply@vlestetica.com',
    'Content-Type: text/plain; charset=UTF-8'
];

$mailSent = mail(
    $clinicEmail,
    $subject,
    $emailContent,
    implode("\r\n", $headers)
);

/* =========================
    WHATSAPP MESSAGE
========================= */

$whatsMessage = rawurlencode(
    "Olá, meu nome é {$name}.\n" .
    "Gostaria de agendar: {$service}.\n" .
    "Telefone: {$phone}"
);

$whatsappLink =
    "https://wa.me/5573991054557?text={$whatsMessage}";

/* =========================
    RESPONSE
========================= */

if (!$mailSent) {
    echo json_encode([
        'success' => false,
        'message' => 'Não foi possível enviar o formulário.'
    ]);

    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Formulário enviado com sucesso.',
    'whatsapp' => $whatsappLink
]);