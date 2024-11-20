import React, { useEffect, useState } from 'react'
import './List.css'
import { toast } from "react-toastify";
import axios from 'axios'

const List = ({url}) => {
 
  const [list, setList] = useState([])
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if(response.data.success){
      setList(response.data.data)
    
  }else{
    console.log(response.data.message)
    toast.error(response.data.message)
   
    
  }
  }

  const deleteFood = async (id) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id }); // Send ID in the body
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list after successful deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error("Failed to delete food item.");
    }
  };
  
  
  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div className='list add flex-col'>
     <p>All Food List</p>
     <div className='list-table'>
      <div className='list-table-format title'>
        <b>Image</b> 
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
       

      </div>
      {
        list.map((item, index)=>{
          return (
            <div key={index} className='list-table-format'>
             <img src={item.image} alt="" />
             <p>{item.name}</p>
             <p>{item.category}</p>
             <p>{item.price}</p>
             <p onClick={()=>deleteFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })
      }

     </div>
      </div>
  )
}

export default List