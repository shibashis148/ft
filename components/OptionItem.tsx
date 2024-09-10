import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import DragIcon from "../public/icons/drag.svg";

interface OptionItemProps {
    option: {
        id: number;
        name: string;
    }
}

const OptionItem = ({ option }: OptionItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: option.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="w-full flex items-center border-2 rounded-md cursor-move">
            <div className="p-2">
                <Image src={DragIcon} alt="drag" className="w-5" />
            </div>
            <span className="py-2">{option.name}</span>
        </div>
    )
}

export default OptionItem;
