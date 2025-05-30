import React,{useState,useEffect} from 'react'
import "./Categorias.css"
import Header from '../../layouts/header/Header'
import { fetchCategories } from '../../utils'
import { AddCategory } from '../../utils'

const Categorias = () => {
    const [categories, setCategories] = useState([]);
       const [name, setName] = useState("");
       const [description, setDescription] = useState("");


           useEffect(() => {
                const fetchCat = async () => {
                  try {
                    const data = await fetchCategories();
                    setCategories(data);
                  } catch (err) {
                    console.error("Error al obtener categorias: ", err.message);
                  }
                };
                fetchCat()
              
           }, []);
  return (
    <div className='Categorias'>
        <Header/>
<div className="form-container">
<form className="form" onSubmit={(e) => {
  e.preventDefault();
  AddCategory({ name, description });
}}>
        <div className="form-group">
          <label for="email">Nombre de la categoria</label>
          <input type="text" placeholder='Nombre' required="" onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div className="form-group">
          <label for="textarea">Agregue una descripcion de categoria</label>
          <textarea name="textarea" id="textarea" rows="10" cols="50" required="" onChange={(e)=>{setDescription(e.target.value)}}>          </textarea>
        </div>
        <button className="form-submit-btn" type="submit">Submit</button>
      </form>
    </div>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripcion</th>
    </tr>
  </thead>
  <tbody>
  {categories.map((category, index) => (

             <tr key={index}>
             <th scope="row">{index}</th>
             <td>{category.name}</td>
             <td>{category.description}</td>
           </tr>
           ))}

      
    
  </tbody>
</table>
    </div>
  )
}

export default Categorias