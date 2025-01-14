<?php

include_once("../model/contactModel.php");

$data = json_decode(file_get_contents("php://input"), true);
$response = array();
$nuevoContacto = new contactModel();

if ($data && isset($data['nombre'], $data['email'], $data['asunto'], $data['mensaje'])) {
    $nombre = $data['nombre'];
    $email = $data['email'];
    $asunto = $data['asunto'];
    $mensaje = $data['mensaje'];

    $nuevoContacto->setNombre($nombre);
    $nuevoContacto->setEmail($email);
    $nuevoContacto->setAsunto($asunto);
    $nuevoContacto->setMensaje($mensaje);

    
    $response = $nuevoContacto->insertContact();
} else {
    $response = ['error' => true, 'message' => 'Datos incompletos en la solicitud'];
}

echo json_encode($response);

$nuevoContacto->CloseConnect();  // Cerrar la conexión después de su uso.
unset($nuevoContacto);
