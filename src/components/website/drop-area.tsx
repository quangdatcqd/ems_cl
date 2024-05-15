import React from 'react'; 
 
interface TypeProps{
    handleDragEnter:Function
}

function DropArea({handleDragEnter}:TypeProps) { 
    return (
        <div onDrop={()=>handleDragEnter()} onDragOver={e=>e.preventDefault()} className='my-5 select-none w-100 h-[50px] cursor-grab flex justify-center items-center border-blue-400 border-dashed border-2 rounded text-center '>
             Drop Here 
        </div>
    );
}

export default DropArea;