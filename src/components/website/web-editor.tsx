

import { useEffect, useState } from 'react';
import DropArea from './drop-area';
import { useWebEditorConfig } from '../../provider/webEditorProvider';
import { ButtonGroup, IconButton, Input, Radio } from 'rsuite';
import { HexColorPicker } from "react-colorful";
import MinusIcon from '@rsuite/icons/Minus';
import { WebComponents } from './components/WebComponent';
import TrashIcon from '@rsuite/icons/Trash';
import { Button } from '@mui/material';
import AlignLeftIcon from '@rsuite/icons/legacy/AlignLeft';
import AlignCenterIcon from '@rsuite/icons/legacy/AlignCenter';
import AlignRightIcon from '@rsuite/icons/legacy/AlignRight';
import AlignJustifyIcon from '@rsuite/icons/legacy/AlignJustify';
import TaiwandFlag from '../../assets/flags/taiwand_flag.png';
import UKFlag from '../../assets/flags/UK_flag.png';
import VIFlag from '../../assets/flags/VI_flag.png';

export default function WebEditor({ setActiveKey, languages }: any) {
    const [boxEditor, setBoxEditor] = useState<any>(null);
    const { activeLang, webConfigs, handleDragEnter, handleRemoveSection } = useWebEditorConfig();

    const handleSelectSection = (  index: number) => {
        if (boxEditor?.config !== index) {
            setActiveKey("")
            setBoxEditor({
                pos: {
                    top: 85,
                    right: -8
                },
                indexSection: index,
                config: webConfigs[index],
                languages: languages
            })
        } else setBoxEditor(null)
    }

    return (
        <>
            <div className='bg-white flexible-box flex-grow p-3 mt-20 ml-14  relative' style={{ width: boxEditor ? "calc(100% - 310px)" : "calc(100% - 56px)" }}   >
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
                            className='absolute  right-5 top-0 shadow-xl z-50 bg-red-500'
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
                                onClick={() => handleSelectSection( index)} >

                                <Element.component config={element} activeLang={activeLang?.name} />
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
    const { activeLang, setActiveLang } = useWebEditorConfig();
    console.log(boxEditor);

    return (
        <div
            className='px-1 pb-10 w-[250px]  rounded-xl overflow-y-scroll custom-scroll'
            style={{
                height: 'calc(100vh - 110px)'
            }}
        >
            {
                boxEditor?.config?.bgType &&
                <ChangeBG indexSection={boxEditor?.indexSection} config={boxEditor?.config} />
            }
            <div className='w-full  my-2 flex gap-2'>
                {
                    boxEditor.languages?.split(",").map((lang: string, index: number) => {
                        if (lang === "EN")
                            return (<div key={index} onClick={() => setActiveLang({ name: 'ENG_text', placeholder: 'Type here...' })}
                                className={`w-6 rounded-full cursor-pointer border-2 ${activeLang?.name === 'ENG_text' ? 'border-sky-300' : ''}`}>
                                <img src={UKFlag} className='w-6' alt="" />
                            </div>)
                        if (lang === "TW")
                            return <div key={index} onClick={() => setActiveLang({ name: 'TW_text', placeholder: '在此輸入...' })}
                                className={`w-6 rounded-full cursor-pointer border-2 ${activeLang?.name === 'TW_text' ? 'border-sky-300' : ''}`}>
                                <img src={TaiwandFlag} className='w-6' alt="" />
                            </div>

                        if (lang === "VI")
                            return <div key={index} onClick={() => setActiveLang({ name: 'VI_text', placeholder: 'Nhập...' })}
                                className={`w-6 rounded-full cursor-pointer border-2 ${activeLang?.name === 'VI_text' ? 'border-sky-300' : ''}`}>
                                <img src={VIFlag} className='w-6' alt="" />
                            </div>

                    })
                }
            </div>
            {
                boxEditor?.config?.elements?.map((element: any, index: number) => {
                    if (element.name === "text") return <div key={index}  >
                        <TextArea index={index} indexSection={boxEditor?.indexSection} element={element} />
                    </div>
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

    const [showPicker, setShowPicker] = useState(false);
    const [colorValue, setColorValue] = useState(element.color);
    const { activeLang } = useWebEditorConfig()

    const [value, setValue] = useState(element[activeLang.name].replace(/<br\/>/g, '\n'));
    const handleTextChange = (event: any) => {
        setValue(event.target.value)
        let formattedText = event.target.value.replace(/\n/g, '<br/>');
        setWebConfigs(preConfigs => {
            const newConfig = [...preConfigs];
            newConfig[indexSection].elements[index][activeLang.name] = formattedText;
            return newConfig
        })
    };
    const handleChangeAlign = (align: string) => {
        setWebConfigs(preConfigs => {
            const newConfig = [...preConfigs];
            newConfig[indexSection].elements[index].align = align;
            return newConfig
        })
    }
    const handleChangeColor = (color: string) => {
        setColorValue(color)
        setWebConfigs(preConfigs => {
            const newConfig = [...preConfigs];
            newConfig[indexSection].elements[index].color = color;
            return newConfig
        })
    }

    useEffect(() => {
        setValue(element[activeLang.name].replace(/<br\/>/g, '\n'))
        setColorValue(element.color)
        setShowPicker(false)
    }, [element, activeLang])

    return <div className='relative mt-2'>
        <div className='font-[500] flex items-center justify-between' >
            <p>Text edit:</p>
            <Button variant='text' style={{ padding: 5 }} onClick={() => setShowPicker(showPicker ? false : true)}>
                {showPicker ? "Close" : "Style"}
            </Button>
        </div>

        <textarea
            rows={3}
            value={value}
            onChange={handleTextChange}
            placeholder={activeLang?.placeholder}
            className='w-[100%]  px-2 rounded-md border-2 border-dashed border-slate-300  outline-sky-200 custom-scroll  '
        />

        {
            showPicker &&
            <div className='absolute top-8 right-0 rounded-xl shadow-2xl flex flex-col border-2 bg-white p-5   z-50'>
                <div className='flex items-center justify-evenly gap-1'>
                    <p className='whitespace-nowrap'>Align: </p>
                    <ButtonGroup>
                        <IconButton onClick={() => handleChangeAlign("left")} icon={<AlignLeftIcon />} />
                        <IconButton onClick={() => handleChangeAlign("center")} icon={<AlignCenterIcon />} />
                        <IconButton onClick={() => handleChangeAlign("right")} icon={<AlignRightIcon />} />
                        <IconButton onClick={() => handleChangeAlign("justify")} icon={<AlignJustifyIcon />} />
                    </ButtonGroup>
                </div>
                <div className='flex items-center justify-evenly gap-2 my-2'>
                    <p className='whitespace-nowrap'>Color: </p>
                    <Input
                        value={colorValue}
                        onChange={setColorValue}
                        placeholder={"Color value"}
                        className='w-[9rem]'
                    />
                </div>
                {
                    <HexColorPicker onChange={handleChangeColor} />
                }
            </div>
        }
    </div>
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


    const [showPicker, setShowPicker] = useState(false)
    const [BGType, setBGType] = useState<string>(config.bgType)
    const [BGValue, setBGValue] = useState<any>(config.bgValue)
    useEffect(() => {
        setBGType(config.bgType)
        setBGValue(config.bgValue)
        setShowPicker(false)
    }, [config])
    useEffect(() => {
        setWebConfigs(preConfigs => {
            const newConfig = [...preConfigs];
            newConfig[indexSection].bgType = BGType;
            newConfig[indexSection].bgValue = BGValue;
            return newConfig
        })
    }, [BGType, BGValue, config])
    return <div className='  '>
        <Button variant='contained' sx={{ marginTop: 2, padding: "5px 20px" }} onClick={() => setShowPicker(showPicker ? false : true)}>
            {showPicker ? "Close" : "Edit Background"}
        </Button>
        {
            showPicker && <div className='absolute bg-white  z-50 p-5 border-2 rounded-xl shadow-xl right-0'>
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
    </div>
}