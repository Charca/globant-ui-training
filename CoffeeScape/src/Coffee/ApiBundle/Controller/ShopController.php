<?php

namespace Coffee\ApiBundle\Controller;

use Coffee\ApiBundle\Form\ShopType;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;

use Coffee\ApiBundle\Entity\Shop;

class ShopController extends FOSRestController
{
    /**
     * @Route("/shop/add")
     * @Template()
     *
     */
    public function addAction(Request $request)
    {
        $shop = new Shop();
        $form = $this->createForm(new ShopType(), $shop);
        $form->handleRequest($request);
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($shop);
            $em->flush();
            if ($form->get('save_and_add')->isClicked()) {
                return $this->redirect($this->generateUrl('coffee_api_shop_add'));
            } else {
                return $this->redirect($this->generateUrl('coffee_api_shop_list'));
            }
            //return new Response('Created shop id '.$shop->getId());
        } else {
            return array('msg' => 'Que chupete!', 'form' => $form->createView());
        }

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

    public function getShopAction($id)
    {
        $shop = $this->getDoctrine()
            ->getRepository('CoffeeApiBundle:Shop')
            ->find($id);
        return $shop;
    }

    /**
     * @Route("/shop/list")
     * @Rest\View
     */
    public function listAction()
    {
        $shops = $this->getDoctrine()
            ->getRepository('CoffeeApiBundle:Shop')
            ->findAllAsArray();
        if (!$shops) {
            throw $this->createNotFoundException(
                'No products found'
            );
        }
        return array('shops' => $shops);
    }

}
