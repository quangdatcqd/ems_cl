import React from 'react'; 

interface propTypes {
    label: string,
    name: string,
    onChange?:React.FC
};

function LongInput({ label, name, onChange }: propTypes) {

    return (
        <div className='mt-5'>
            <label className='text-[#410f0f]  '>{label}</label>
            <textarea name={name} onChange={onChange} rows={3}   className='custom-scroll leading-5  outline-none rounded resize-none mt-1 border-b border-b-slate-400  hover:border-b-slate-900  focus:border-b-slate-900   px-2  bg-[#0001] w-[100%]'/>
        </div>
    );
}

export default LongInput;