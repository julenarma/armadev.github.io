<?php
class DonationClass
{

    protected $idDonacion;
    protected $nombre;
    protected $mensaje;
    protected $cantidad;
    protected $fecha;

    public function getidDonacion()
    {
        return $this->idDonacion;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getMensaje()
    {
        return $this->mensaje;
    }
 
    public function getCantidad()
    {
        return $this->cantidad;
    }

    public function getFecha()
    {
        return $this->fecha;
    }

    public function setIdDonacion($idDonacion)
    {
        $this->idDonacion = $idDonacion;
    }

    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    public function setMensaje($mensaje)
    {
        $this->mensaje = $mensaje;
    }

    public function setCantidad($cantidad)
    {
        $this->cantidad = $cantidad;
    }

    public function setFecha($fecha)
    {
        $this->fecha = $fecha;
    }
}
