import React,{ useState,useEffect } from 'react';
import "./Category_list.css";

const Category_list = () => {
   const [categories, setCategories] = useState([]);
       useEffect(() => {
           fetch("/categorias.json")
               .then((response) => response.json())
               .then((data) => setCategories(data))
               .catch((error) => console.error("Error fetching data: ", error));
       }, []);
     return (
       <div className='category'>
        
         <h1>Categorias</h1>
         <hr />
         <ul className="category_list">
          <div className="search_bar">
          <input type="text" placeholder="Buscar..." />
          <button className="search_button"> <i class="ri-search-line"></i> </button>
        </div>
           {categories.map((category, index) => (
             <li key={index} className="category_list_item">
               <button href="#">{category.nombre}</button>
             </li>
           ))}
   
         </ul>
   
       </div>
     )
}

export default Category_list