import React from 'react';
import { useParams } from 'react-router-dom';
import { ListSections } from '../../components/website/components/sections/ListSections';
 
 
function RenderSection() {
    const params = useParams(); 
    return (
        <div>  
            {
                ListSections.map((Section,index)=>{
                   if(Section.name.toLowerCase() === params.id) return  <Section key={index}/>
                })
            }
        </div>
    );
}

export default RenderSection;