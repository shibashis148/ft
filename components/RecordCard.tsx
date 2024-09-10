"use client"
import Image from "next/image";
import RecordImage from "@/public/images/record1.png";
import { useGetGameByIdQuery } from "@/redux/services/gameService";
import Loader from "./Loader";
import { GameSubmission } from "@/redux/types";
import { useState } from "react";

const RecordCard = ({ submission }: { submission: GameSubmission }) => {
    const { data, isLoading } = useGetGameByIdQuery(submission?.gameId);
    const game = data?.game;
    console.log("game", game.currectOption);
    const checkCorrect = (gameOption: string[], userOption: string[]) => {
        const gameStr = gameOption.join(",");
        const userStr = userOption.join(",");
        return gameStr.includes(userStr);
    }

    if (isLoading) return <Loader />;
    return (
        <div className="flex flex-col w-full bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative">
                <Image src={RecordImage} alt="record" width={300} height={300} className="w-full" />
                <div className="absolute top-0 left-0 w-full h-full bg-black text-white bg-opacity-20 flex flex-col gap-2 p-3">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-xl">{submission?.restaurantId}</p>
                        <span className="text-sm">{game?.currectOption?.length === 3 ? "Completed" : "Ongoing"}</span>
                    </div>
                    <h1 className="text-xl uppercase">{game?.title}</h1>
                </div>
            </div>
            <div className="flex flex-col p-3 pt-2">
                <p className="">{checkCorrect(game?.currectOption, submission?.userOptions) ? "Next 2 drinks on us...!" : "Better luck next time...!"}</p>
            </div>
        </div>
    )
}

export default RecordCard;