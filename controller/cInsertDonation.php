<?php

include_once("../model/donationModel.php");

$data = json_decode(file_get_contents("php://input"), true);
$response = array();
$nuevaDonacion = new donationModel();

if ($data && isset($data['nombre'], $data['mensaje'], $data['cantidad'])) {
    $nombre = $data['nombre'];
    $mensaje = $data['mensaje'];
    $cantidad = $data['cantidad'];

    $nuevaDonacion->setNombre($nombre);
    $nuevaDonacion->setMensaje($mensaje);
    $nuevaDonacion->setCantidad($cantidad);

    $response = $nuevaDonacion->insertDonation();

} else {
    $response = ['error' => true, 'message' => 'Datos incompletos en la solicitud'];
}

echo json_encode($response);

$nuevaDonacion->CloseConnect();  // Cerrar la conexión después de su uso.
unset($nuevaDonacion);
