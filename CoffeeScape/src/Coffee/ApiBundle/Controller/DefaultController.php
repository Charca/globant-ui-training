<?php

namespace Coffee\ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('CoffeeApiBundle:Default:index.html.twig', array('name' => $name));
    }
}
