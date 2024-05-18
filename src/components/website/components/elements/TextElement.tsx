import React from 'react';
interface propTypes {
    text: string,
    name?: string,
    onChange?: React.FC,
};

export default function TextElement({    text }: propTypes) {

    return (
        <p className='uppercase font-[500] text-center text-5xl text-[#361502]'> {text}</p>
    );
}
