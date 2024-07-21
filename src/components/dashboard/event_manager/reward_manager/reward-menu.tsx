import * as React from 'react';
import RewardItem from './reward-item';
import { RewardEditItem } from './reward-edit-item';
import { RewardAddItem } from './reward-add-item';
import toast from 'react-hot-toast';
import { RewardDataType } from '../../../../interface/reward';
import rewardService from '../../../../services/admin/rewardService.service';
import { RewardFilter } from './reward-filter';
import { Button } from '@mui/material';


export function RewardMenu({ eventData }: any) {
  const [rewardDataEdit, setRewardDataEdit] = React.useState<RewardDataType | null>(null);
  const [rewardData, setRewardData] = React.useState([]);
  const [keyword, setKeyword] = React.useState("all");
  const [showAddReward, setShowAddReward] = React.useState(false);


  const fetchReward = async () => {
    const rewards = await rewardService.getAllReward(eventData._id, keyword);
    setRewardData(rewards.data);
  }
   
  React.useEffect(() => {
    fetchReward();
  }, [keyword])

  const onDeleteItem = async (index: number, id: string) => {
    const deleteData = await rewardService.removeReward(id)
    if (deleteData?.data) {
      toast.success("Deleted successfully!", { position: "top-center" })
      setRewardData(rewards => rewards.filter((_: any, i: number) => i !== index))
    } else {
      toast.error(deleteData.message, { position: "top-center" })
    }
  }

  const onUpdateItem = async (form: RewardDataType) => {
    const updateData = await rewardService.modifyReward(form)
    if (updateData?.data) {
      toast.success("Updated successfully!", { position: "top-center" })
      fetchReward();
    } else {
      toast.error(updateData.message, { position: "top-center" })
    }
  }

  const onCancelEdit = () => {
    setRewardDataEdit(null)
  }
  return (
    <div className='p-2 '>
      <div className='grid xs:grid-cols-1 grid-cols-2  sm:grid-cols-3   md:grid-cols-4 xl:grid-cols-5 gap-4'>
        <div>
          <RewardFilter setSort={setKeyword} />
          {
            showAddReward ? <RewardAddItem eventId={eventData._id} reloadData={fetchReward} onCancelAdd={()=>setShowAddReward(false)} />:
            <Button variant="contained" color='success' fullWidth onClick={() => setShowAddReward(true)}>New Reward</Button>
          } 
        </div> 
        {
          rewardData?.map((item: RewardDataType, index: number) => {
            if (rewardDataEdit && rewardDataEdit?._id === item._id)
              return <RewardEditItem key={index} item={rewardDataEdit} onCancelEdit={onCancelEdit} onUpdateItem={onUpdateItem} />
            else
              return <RewardItem key={index} item={item} setDataEdit={setRewardDataEdit} onDeleteItem={() => onDeleteItem(index, item._id)} />
          })
        }
      </div>

    </div>
  );
}


