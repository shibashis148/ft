"use client"
import Image from "next/image";
import QuizImage from "@/public/images/quiz.png";
import Button from "@/components/Button";
import { useState } from "react";
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import OptionItem from "@/components/OptionItem";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

type Option = {
    id: number;
    name: string;
}

const options: Option[] = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
]

const QuizPage = () => {
    const [userOption, setUserOption] = useState<Option[]>(options);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setUserOption(items => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
    return (
        <div className="flex flex-col items-center justify-between bg-white w-full max-w-md p-4">
            <h1 className="text-3xl font-semibold text-center">Rank them in the order</h1>
            <div className="flex flex-col items-center justify-center gap-6 w-full">
                <Image src={QuizImage} alt="Quiz" className="w-full" />

                <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
                        <SortableContext items={userOption} strategy={verticalListSortingStrategy}>
                            {userOption.map((option, index) => (
                                <div key={index} className="flex items-center gap-2 w-full">
                                    <span className="text-xl font-medium">{index + 1}</span>
                                    <OptionItem option={option} />
                                </div>
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>

            <Button />
        </div>
    )
}

export default QuizPage;