

import { useEffect, useRef, useState } from 'react';
import { ListFooters } from './components/footers/ListFooters';
import { ListHeaders } from './components/headers/ListHeaders';
import { ListSections } from './components/sections/ListSections';
import DropArea from './drop-area';
import { useWebEditorConfig } from '../../provider/webEditorProvider';
import { Input, Radio } from 'rsuite';
import { HexColorPicker } from "react-colorful";



export default function WebEditor() {
    const [showDropArea, setShowDropArea] = useState(true);
    const [boxEditor, setBoxEditor] = useState<any>(null);
    const { webConfigs, handleDragEnter } = useWebEditorConfig();
    const webEditorRef = useRef<any>();
    let Component: any = [];

    const generateJsx = (index: any, element: any, Element: any) => {
        return <div
            key={index} className='parent'
            onClick={(e) => handleSelectSection(e, element.name, index)} >
            <Element config={element} />
            {showDropArea && <DropArea handleDragEnter={() => handleDragEnter(index + 1)} />}
        </div>
    }
    webConfigs?.forEach((element, index) => {
        let Element: any = ListSections.find(Section => Section.name === element.name);
        Element && Component.push(generateJsx(index, element, Element))

        Element = ListHeaders.find(Section => Section.name === element.name);
        Element && Component.push(generateJsx(index, element, Element)
        )
        Element = ListFooters.find(Section => Section.name === element.name);
        Element && Component.push(generateJsx(index, element, Element))
    });
    const handleSelectSection = (e: any, id: string, index: number) => {
        if (boxEditor?.config !== index) {
            const webBox = webEditorRef.current.getBoundingClientRect();
            const targetBox = e.target.closest('.parent').getBoundingClientRect();
            const selectedSection = webConfigs?.find(web => web.name === id)
            if (selectedSection)
                setBoxEditor({
                    pos: {
                        top: targetBox.top - webBox.top - 80,
                        right: targetBox.right - webBox.right + 30
                    },
                    indexSection: index,
                    config: { ...selectedSection }
                })
        } else setBoxEditor(null)
    }

    return (
        <div className='bg-white flexible-box flex-grow p-3 mt-20 ml-14  relative'
            ref={webEditorRef}  >
            {
                boxEditor?.pos && <div
                    style={{
                        top: boxEditor.pos.top,
                        right: boxEditor.pos.right
                    }}
                    className={`absolute   bg-white rounded-xl p-2 web-side-nav z-50`}>
                    <TextEditor boxEditor={boxEditor} />
                </div>}
            {showDropArea && <DropArea handleDragEnter={() => handleDragEnter(0)} />}
            {Component}
        </div>
    );
}










function TextEditor({ boxEditor }: any) {
    const { handleRemoveSection } = useWebEditorConfig();
    return (
        <div
            className='p-2 rounded-xl'
            style={{
                width: '250px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
            }}
        >
            {
                boxEditor?.config?.bgType &&
                <ChangeBG indexSection={boxEditor?.indexSection} config={boxEditor?.config} />
            }
            {
                boxEditor?.config?.elements?.map((element: any, index: number) => {
                    if (element.name === "text") return <TextArea key={index} index={index} indexSection={boxEditor?.indexSection} element={element} />
                })
            }

            <div className='text-center'>
                <button className='bg-red-600 text-white rounded-lg py-1 px-5 hover:bg-red-800'
                    onClick={() => handleRemoveSection(boxEditor?.indexSection)}>
                    Delete Section
                </button>
            </div>
        </div>
    );
}


function TextArea({ index, element, indexSection }: { index: number, element: any, indexSection: number }) {
    const { setWebConfigs } = useWebEditorConfig()

    const handleTextChange = (event: any) => {
        let formattedText = event.target.value.replace(/\n/g, '<br>'); 
         formattedText = event.target.value.replace(/[<|>]/g, ''); 
        setWebConfigs(preConfigs => {
            const newConfig = [...preConfigs];
            newConfig[indexSection].elements[index].text = formattedText;
            return newConfig
        })
    };

    return <textarea
        rows={3}
        value={element.text}
        onChange={handleTextChange}
        className='w-[100%] mb-2  p-2 rounded-md border-2 border-dashed border-slate-300  outline-sky-200 custom-scroll  '
    />
}


function ChangeBG({ indexSection, config }: any) {
    const { setWebConfigs } = useWebEditorConfig()

    const [BGType, setBGType] = useState<string>(config.bgType)
    const [BGValue, setBGValue] = useState<any>(config.bgValue) 
    useEffect(() => {
        setWebConfigs(preConfigs => {
            const newConfig = [...preConfigs];
            newConfig[indexSection].bgType = BGType;
            newConfig[indexSection].bgValue = BGValue;
            return newConfig
        })

    }, [BGType, BGValue])
    return <div className='mb-5'>
        <p className='mb-0'  >Background type:</p>
        <div>
            <Radio checked={BGType === "image"} onClick={() => setBGType("image")} color="cyan">
                Image
            </Radio>
            <Radio checked={BGType === "color"} onClick={() => setBGType("color")} color="cyan">
                Color
            </Radio>
        </div>
        <div className='flex items-center gap-1'>
            <span>Value:</span>
            <Input value={BGValue} onChange={setBGValue} placeholder={BGType === "image" ? "Image URL" : "Color value"} />

        </div>
        <div className='flex justify-center mt-2'>
            {
                BGType === "color" && <HexColorPicker onChange={setBGValue} />
            }
        </div>
    </div>
}