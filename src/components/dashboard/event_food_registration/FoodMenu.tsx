import React from "react"; 
import FoodItem from "./food-item";
import foodService from "../../../services/admin/foodService.service";
import { FoodDataType } from "../../../types/food";

export default function FoodMenu({eventId,setOrders,orders}: any) {
    const [foodData, setFoodData] = React.useState([]); 

    const fetchFood = async () => {
        const foods = await foodService.getPublicFood(eventId);
        setFoodData(foods.data);
      }
      
      React.useEffect(() => { 
        fetchFood();
      }, [])
    return  <div className=' mt-5 w-100 '>
    <div className='grid xs:grid-cols-1 grid-cols-1  sm:grid-cols-2   md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
       
      {
        foodData?.map((item: FoodDataType, index: number) => { 
            return <FoodItem key={index} item={item}  setOrders={ setOrders } orders={orders}  />
        })
      }
    </div>

  </div> 
}