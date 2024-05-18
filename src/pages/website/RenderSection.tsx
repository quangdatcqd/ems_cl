
import { useParams } from 'react-router-dom';
import { WebComponents } from '../../components/website/components/WebComponent'; 


export default function RenderSection() {
    const params = useParams();
    return (<div>
        {
            WebComponents.map((Section, index) => {
                if (Section.component.name.toLowerCase() === params.id) return <Section.component key={index} />
            })
        }
    </div>);
}
