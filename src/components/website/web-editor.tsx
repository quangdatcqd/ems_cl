

import { useEffect, useRef, useState } from 'react';
import DropArea from './drop-area';
import { useWebEditorConfig } from '../../provider/webEditorProvider';
import {   IconButton, Input, Radio } from 'rsuite';
import { HexColorPicker } from "react-colorful";
import MinusIcon from '@rsuite/icons/Minus';
import { WebComponents } from './components/WebComponent';
import TrashIcon from '@rsuite/icons/Trash';
export default function WebEditor() { 
    const [boxEditor, setBoxEditor] = useState<any>(null);
    const { webConfigs, handleDragEnter, handleRemoveSection } = useWebEditorConfig();
    const webEditorRef = useRef<any>();

    const handleSelectSection = (id: string, index: number) => {
        if (boxEditor?.config !== index) {
            // const webBox = webEditorRef.current.getBoundingClientRect();
            // const targetBox = e.target.closest('.parent').getBoundingClientRect();
            const selectedSection = webConfigs?.find(web => web.name === id)
            if (selectedSection) {
                // const top = (targetBox.top - webBox.top) - 80;
                setBoxEditor({
                    pos: {
                        // top: top < 10 ? 10 : top,
                        top: 85,
                        right: 15
                        // right: targetBox.right - webBox.right + 30
                    },
                    indexSection: index,
                    config: { ...selectedSection }
                })
            }
        } else setBoxEditor(null)
    }

    return (
        <>

            <div className='bg-white flexible-box flex-grow p-3 mt-20 ml-14  relative' ref={webEditorRef}  >
                 <DropArea handleDragEnter={() => handleDragEnter(0)} /> 
                {
                    boxEditor?.pos && <div
                        style={{
                            top: boxEditor.pos.top,
                            right: boxEditor.pos.right
                        }}
                        className={`fixed  bg-white rounded-xl p-2 shadow-2xl z-50`}>
                        <IconButton onClick={() => setBoxEditor(null)}
                            className='absolute -left-2 -top-1 shadow-xl z-50'
                            style={{ padding: "5px" }}
                            icon={<MinusIcon />}
                            appearance="primary"
                        />
                        <IconButton onClick={() => {
                            handleRemoveSection(boxEditor.indexSection)
                            setBoxEditor(null)
                        }}
                            className='absolute  right-6 top-4 shadow-xl z-50 bg-red-500'
                            style={{ padding: "6px 6px 7px 7px" }}
                            icon={<TrashIcon />}
                            circle
                            appearance="primary"
                        />

                        <BoxEditor boxEditor={boxEditor} />
                    </div>
                }

                {
                    webConfigs?.map((element, index) => {
                        const Element: any = WebComponents.find(Section => Section.component.name === element.name);
                        return <div key={index}>
                            <div className='parent cursor-pointer border-2 hover:border-sky-300'
                                onClick={() => handleSelectSection(element.name, index)} >
                                <Element.component config={element} />
                            </div>
                             <DropArea handleDragEnter={() => handleDragEnter(index + 1)} /> 
                        </div>
                    })
                }
            </div>
        </>
    );
}










function BoxEditor({ boxEditor }: any) {
    return (
        <div
            className='px-5 pb-10 w-25  rounded-xl overflow-y-scroll custom-scroll'
            style={{
                height: 'calc(100vh - 110px)'
            }}
        >
            {
                boxEditor?.config?.bgType &&
                <ChangeBG indexSection={boxEditor?.indexSection} config={boxEditor?.config} />
            }
            {
                boxEditor?.config?.elements?.map((element: any, index: number) => {
                    if (element.name === "text") return <div key={index}  >
                        <p className='font-[500]'>Text edit:</p>
                        <TextArea index={index} indexSection={boxEditor?.indexSection} element={element} />
                    </div>
                })
            }
            {
                boxEditor?.config?.elements?.map((element: any, index: number) => {
                    if (element.name === "image")
                        return <div key={index} className='my-1'>
                            <InputEdit
                                index={index}
                                indexSection={boxEditor?.indexSection}
                                element={element} />
                        </div>
                })
            }
        </div>
    );
}


function TextArea({ index, element, indexSection }: { index: number, element: any, indexSection: number }) {
    const { setWebConfigs } = useWebEditorConfig()
    const [value, setValue] = useState(element.text.replace(/<br\/>/g, '\n'));

    const handleTextChange = (event: any) => {
        setValue(event.target.value)
        let formattedText = event.target.value.replace(/\n/g, '<br/>');
        //  formattedText = event.target.value.replace(/[<|>]/g, ''); 
        setWebConfigs(preConfigs => {
            const newConfig = [...preConfigs];
            newConfig[indexSection].elements[index].text = formattedText;
            return newConfig
        })
    };

    return <textarea
        rows={2}
        value={value}
        onChange={handleTextChange}
        className='w-[100%]  p-2 rounded-md border-2 border-dashed border-slate-300  outline-sky-200 custom-scroll  '
    />
}



function InputEdit({ index, element, indexSection }: { index: number, element: any, indexSection: number }) {
    const { setWebConfigs } = useWebEditorConfig()
    const [value, setValue] = useState(element.text);

    const handleTextChange = (value: string) => {
        setValue(value)
        setWebConfigs(preConfigs => {
            const newConfig = [...preConfigs];
            newConfig[indexSection].elements[index].text = value;
            return newConfig
        })
    };

    return (
        <div className='flex items-center gap-1'>
            <p className='whitespace-nowrap'>Image URL: </p>
            <Input
                defaultValue={value}
                onChange={handleTextChange}
            />
        </div>
    )
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
    return <div className=''>
        <p className='mb-0 font-[500]'  >Background type:</p>
        <div>
            <Radio checked={BGType === "image"} onClick={() => setBGType("image")} color="cyan">
                Image
            </Radio>
            <Radio checked={BGType === "color"} onClick={() => setBGType("color")} color="cyan">
                Color
            </Radio>
        </div>
        <div className='flex items-center gap-1'>
            <span className='font-[500]'> Value:</span>
            <Input
                value={BGValue}
                onChange={setBGValue}
                placeholder={BGType === "image" ? "Image URL" : "Color value"}
            />
        </div>
        <div className='flex justify-center mt-2'>
            {
                BGType === "color" && <HexColorPicker onChange={setBGValue} />
            }
        </div>
    </div>
}