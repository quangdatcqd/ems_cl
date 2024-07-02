import * as React from 'react';
import FoodItem from './food-item';
import { FoodEditItem } from './food-edit-item';
import { FoodAddItem } from './food-add-item';
import foodService from '../../../../services/admin/foodService.service';
import toast from 'react-hot-toast';
import { FoodDataType } from '../../../../interface/food';


export function FoodMenu({ eventId }: any) {
  const [foodDataEdit, setFoodDataEdit] = React.useState<FoodDataType | null>(null);
  const [foodData, setFoodData] = React.useState([]);
  const fetchFood = async () => {
    const foods = await foodService.getAllFood(eventId,"userId");
    setFoodData(foods.data);
  }
  React.useEffect(() => { 
    fetchFood();
  }, [])

  const onDeleteItem = async (index: number, id: string) => {
    const deleteData = await foodService.removeFood(id)
    if (deleteData?.data) {
      toast.success("Deleted successfully!", { position: "top-center" })
      setFoodData(foods => foods.filter((_: any, i: number) => i !== index))
    } else {
      toast.error(deleteData.message, { position: "top-center" })
    }
  }

  const onUpdateItem = async (form:FoodDataType) => { 
    const updateData = await foodService.modifyFood(form)
    if (updateData?.data) {
      toast.success("Updated successfully!", { position: "top-center" }) 
      fetchFood();
    } else {
      toast.error(updateData.message, { position: "top-center" })
    }
  }

  const onCancelEdit = () => {
    setFoodDataEdit(null)
  }
  return ( 
    <div className='p-2 '>
      <div className='grid xs:grid-cols-1 grid-cols-2  sm:grid-cols-3   md:grid-cols-4 xl:grid-cols-6 gap-4'>
        <FoodAddItem eventId={eventId} reloadData={fetchFood} />
        {
          foodData?.map((item: FoodDataType, index: number) => {
            if (foodDataEdit && foodDataEdit?._id === item._id)
              return <FoodEditItem key={index} item={foodDataEdit} onCancelEdit={onCancelEdit} onUpdateItem={onUpdateItem} />
            else
              return <FoodItem key={index} item={item} setDataEdit={setFoodDataEdit} onDeleteItem={() => onDeleteItem(index, item._id)} />
          })
        }
      </div>

    </div> 
  );
}


