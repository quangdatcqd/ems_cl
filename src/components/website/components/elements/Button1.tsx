import React from 'react'; 
interface Button1Types  {
    title : string,
    href ?:string, 

};
 
function Button1({title,href }:Button1Types) {
    
    return (
        <div className='my-2'>
            <a href={href} className={` bg-[#361502be] text-white cursor-pointer py-2 pt-1 px-8 hover:no-underline hover:text-[#c7c7c7]`}>{title}</a>
        </div>
    );
}

export default Button1;