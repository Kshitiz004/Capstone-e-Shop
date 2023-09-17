import Shoes from "../assests/images/shoes-1.jpeg";
import Sandels from "../assests/images/sandels-1.jpeg";
import Shirt from "../assests/images/shirt-1.jpeg";
import Phone from "../assests/images/phone-1.jpeg";
import Facewash from "../assests/images/facewash-1.jpeg";

export default function InitialProducts() {
    return [
        {
            key: 1,
            name:'Shoes',
            price:800,
            description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
            photo: Shoes,
            category: 'FOOTWEAR',
            modifiedDate: new Date().toLocaleString(),
            quantity: 60,
            manufacturer: 'TATA'
        },
        {
            key: 2,
            name:'Shirt',
            price:250,
            description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
            photo: Shirt,
            category: 'APPAREL',
            modifiedDate: new Date().toLocaleString(),
            quantity: 150,
            manufacturer: 'TATA'
        },
        {
            key: 3,
            name:'Phone',
            price:60000,
            description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
            photo: Phone,
            category: 'ELECTRONICS',
            modifiedDate: new Date().toLocaleString(),
            quantity: 300,
            manufacturer: 'TATA'
        },
        {
            key: 4,
            name:'Face Wash',
            price:300,
            description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
            photo: Facewash,
            category: 'PERSONAL CARE',
            modifiedDate: new Date().toLocaleString(),
            quantity: 150,
            manufacturer: 'TATA'
        },
        {
            key: 5,
            name:'Sandels',
            price:600,
            description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
            photo: Sandels,
            category: 'FOOTWEAR',
            modifiedDate: new Date().toLocaleString(),
            quantity: 60,
            manufacturer: 'TATA'
        }
    ];
}