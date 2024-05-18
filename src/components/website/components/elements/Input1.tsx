 
interface propTypes  {
    label:string
};

function Input1({label}:propTypes) {
    return (
        <div className='mt-4'>
        <label className='text-[#410f0f]'>{label}</label>
        <input type="text" id='fullname' className='outline-none bg-[#0001]  border-b border-b-slate-400  hover:border-b-slate-900  focus:border-b-slate-900   px-2 py-1     w-[100%]' /> 
    </div>
    );
}

export default Input1;