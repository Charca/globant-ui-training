<?php

namespace Coffee\ApiBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use Symfony\Component\Validator\Constraints\Valid;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Shop
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Coffee\ApiBundle\Entity\ShopRepository")
 * @ExclusionPolicy("all")
 */
class Shop
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="name", type="string", length=200)
     * @Assert\NotBlank
     * @Assert\Length(
     *      min = "2",
     *      max = "200",
     *      minMessage = "Your first name must be at least {{ limit }} characters length",
     *      maxMessage = "Your first name cannot be longer than {{ limit }} characters length"
     * )
     */
    private $name;

    /**
     * @var string
     * @ORM\Column(name="latitude", type="decimal", precision=10, scale=6)
     * @Assert\NotBlank(message="Lat must be setted")
     */
    private $latitude;

    /**
     * @var string
     * @ORM\Column(name="longitude", type="decimal", precision=10, scale=6)
     * @Assert\NotBlank
     */
    private $longitude;

    /**
     * @var string
     * @ORM\Column(name="contact", type="string", length=255)
     * @Assert\NotBlank
     * @Assert\Email(
     *      message = "The email '{{ value }}' is not valid.",
     *      checkMX = true
     * )
     */
    private $contact;

    /**
     * @ORM\ManyToMany(targetEntity="Category", inversedBy="products")
     * NOTNEEDED : ORM\JoinColumn(name="category_id", referencedColumnName="id")
     */
    protected $categories;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Shop
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set latitude
     *
     * @param string $latitude
     * @return Shop
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * Get latitude
     *
     * @return string 
     */
    public function getLatitude()
    {
        return $this->latitude;
    }

    /**
     * Set longitude
     *
     * @param string $longitude
     * @return Shop
     */
    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * Get longitude
     *
     * @return string 
     */
    public function getLongitude()
    {
        return $this->longitude;
    }

    /**
     * Set contact
     *
     * @param string $contact
     * @return Shop
     */
    public function setContact($contact)
    {
        $this->contact = $contact;

        return $this;
    }

    /**
     * Get contact
     *
     * @return string 
     */
    public function getContact()
    {
        return $this->contact;
    }

    /**
     * Set category
     *
     * @param \Coffee\ApiBundle\Entity\Category $category
     * @return Shop
     */
    public function setCategories(\Coffee\ApiBundle\Entity\Category $category = null)
    {
        $this->categories = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return \Coffee\ApiBundle\Entity\Category 
     */
    public function getCategories()
    {
        return $this->categories;
    }
}
