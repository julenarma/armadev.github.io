<?php
class contactClass
{

    protected $idContacto;
    protected $nombre;
    protected $email;
    protected $asunto;
    protected $mensaje;


    public function getidContacto()
    {
        return $this->idContacto;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getAsunto()
    {
        return $this->asunto;
    }

    public function getMensaje()
    {
        return $this->mensaje;
    }


    public function setIdContacto($idContacto)
    {
        $this->idContacto = $idContacto;
    }

    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function setAsunto($asunto)
    {
        $this->asunto = $asunto;
    }

    public function setMensaje($mensaje)
    {
        $this->mensaje = $mensaje;
    }
}
