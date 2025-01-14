<?php
	
	include_once( "../model/donationModel.php" );
	
    $donacion= new donationModel();
	
	$response = array();
    //Lista de donaciones
	$response['list'] = $donacion->getAllDonations();   
	
	echo json_encode( $response );
	
	unset ($donacion);