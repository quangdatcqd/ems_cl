 
import Header from './components/Header';
import Footer from './components/Footer'; 
import { ListSections } from './components/sections/ListSections';
import DropArea from './drop-area';



interface PropTypes {
    handleDragEnter: Function,
    webConfigs: {
        header: boolean,
        footer: boolean,
        sections: { name: string }[] 
    }
}
export default function WebEditor({ webConfigs, handleDragEnter }: PropTypes) { 

    let Component: any = [];
    if (webConfigs.header) Component.push(Header)

    webConfigs?.sections?.forEach(element => {
        Component.push(...ListSections.filter(Section => Section.name === element.name))
    });

    if (webConfigs.footer) Component.push(Footer)


    return (
        <div className='bg-white flexible-box flex-grow p-3 mt-20 ml-14' > 
            {
                Component.map((Comp: any, index: number) => (
                    <div key={index}  >
                        <div
                            className='border-2 border-transparent hover:border-green-500 hover:border-2 cursor-pointer' >
                            <Comp />
                        </div>
                        {
                            Comp.name !== "Footer" && <DropArea handleDragEnter={() => handleDragEnter(index)} />
                        }
                    </div>
                ))
            }
        </div>
    );
}

