 
interface TypeProps {
    handleDragEnter: Function
}

function DropArea({ handleDragEnter }: TypeProps) {
    return (
        <div onDrop={() => handleDragEnter()}
            onDragOver={e => e.preventDefault()}
            className='my-2 select-none w-100 h-[70px] cursor-grab flex justify-center items-center border-blue-200 border-dashed border-4 rounded-xl text-center  '>
            Drop Here
        </div>
    );
}

export default DropArea;