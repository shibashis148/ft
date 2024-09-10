import Image from "next/image";
import GameImage from "@/public/images/game1.png";
import { Game } from "@/redux/types";

const GamesCard = ({ game }: { game: Game }) => {

    const formattedDate = new Date(game.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    return (
        <div className="flex flex-col w-full bg-white rounded-lg overflow-hidden shadow-md">
            <Image src={GameImage} alt="game" width={300} height={300} className="w-full" />
            <div className="flex flex-col p-4 pt-2">
                <h1 className="font-medium">{game.event}</h1>
                <p className="text-primary font-semibold text-sm">{game.title}</p>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">{game.description}</p>
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>
            </div>
        </div>
    )
}

export default GamesCard;