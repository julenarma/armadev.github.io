<?php

include_once("contactClass.php");
include_once("connect_data.php");

class contactModel extends contactClass
{
    private $link;

    public function OpenConnect()
    {
        $konDat = new connect_data();

        try {
            $this->link = new mysqli($konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8");
    }

    public function CloseConnect()
    {
        if ($this->link) {
            mysqli_close($this->link);
            $this->link = null;
        }
    }

    public function insertContact()
    {
        $this->OpenConnect();
        $nombre = $this->getNombre();
        $email = $this->getEmail();
        $asunto = $this->getAsunto();
        $mensaje = $this->getMensaje();

        $sql = "CALL spInsertContact('$nombre','$email','$asunto','$mensaje')";

        if ($this->link->query($sql)) {
            $this->CloseConnect();
            return true;
        } else {
            $this->CloseConnect();
            return false;
        }

    }


}
