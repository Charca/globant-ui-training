<?php

namespace Coffee\ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;

use Coffee\ApiBundle\Entity\Shop;

class ShopController extends Controller
{
    /**
     * @Route("/shop/add")
     * @Template()
     */
    public function addAction()
    {
    	$shop = new Shop();
    	$shop->setName("Coffee Break");
    	$shop->setLatitude(0);
    	$shop->setLongitude(0);
    	$shop->setContact("coffebreak@gmail.com");
    	
    	$em = $this->getDoctrine()->getManager();
    	$em->persist($shop);
    	$em->flush();
    	
    	return new Response('Created shop id '.$shop->getId());
    }

    /**
     * @Route("/shop/edit/{id}")
     * @Template()
     */
    public function editAction()
    {
    	$em = $this->getDoctrine()->getManager();
    	$product = $em->getRepository('AcmeStoreBundle:Product')->find($id);
    	
    	if (!$product) {
    		throw $this->createNotFoundException(
    				'No product found for id '.$id
    		);
    	}
    	
    	$product->setName('New product name!');
    	$em->flush();
    	
    	return $this->redirect($this->generateUrl('homepage'));
    }

    /**
     * @Route("/shop/remove/{id}")
     * @Template()
     */
    public function removeAction()
    {
    	$em->remove($product);
    	$em->flush();
    }
    
    /**
     * @Route("/shop/show/{id}")
     * @Template()
     */
    public function showAction($id)
    {
    	$shop = $this->getDoctrine()
    	->getRepository('CoffeeApiBundle:Shop')
    	->find($id);
    	
    	if (!$shop) {
    		throw $this->createNotFoundException(
    				'No product found for id '.$id
    		);
    	}
    	
    	return new Response('This is shop ' . $shop->getName());
    }

}
