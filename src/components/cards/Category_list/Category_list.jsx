import React,{ useState,useEffect } from 'react';
import "./Category_list.css";
import { fetchCategories } from '../../../utils';

const Category_list = () => {
  useEffect(()=>{
    
  })
   const [categories, setCategories] = useState([]);
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");

       useEffect(() => {
            const fetchCat = async () => {
              try {
                const data = await fetchCategories();
                setCategories(data);
              } catch (err) {
                console.error("Error al obtener usuarios: ", err.message);
              }
            };
            fetchCat()
          
       }, []);
     return (
       <div className='category'>
        
         <h1>Categorias</h1>
         <hr />
         <ul className="category_list">
          <div className="search_bar">
          <input type="text" placeholder="Buscar..." />
          <button className="search_button"> <i className="ri-search-line"></i> </button>
        </div>
           {categories.map((category, index) => (
             <li key={index} className="category_list_item">
               <button href="#">{category.name}</button>
             </li>
           ))}
         </ul>
   
       </div>
     )
}

export default Category_list