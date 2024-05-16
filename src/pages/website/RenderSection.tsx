 
import { useParams } from 'react-router-dom';
import { ListSections } from '../../components/website/components/sections/ListSections';
import { ListHeaders } from '../../components/website/components/headers/ListHeaders';
import { ListFooters } from '../../components/website/components/footers/ListFooters';

 
function RenderSection() {
    const params = useParams(); 
    return (
        <div>  
            {
                ListSections.map((Section,index)=>{
                   if(Section.name.toLowerCase() === params.id) return  <Section key={index}/>
                })
            }
            {
                ListHeaders.map((Section,index)=>{
                   if(Section.name.toLowerCase() === params.id) return  <Section key={index}/>
                })
            }
            {
                ListFooters.map((Section,index)=>{
                   if(Section.name.toLowerCase() === params.id) return  <Section key={index}/>
                })
            }
        </div>
    );
}

export default RenderSection;