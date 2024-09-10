"use client";
import { useGetAllGamesQuery } from "@/redux/services/gameService";
import Loader from "@/components/Loader";
import GamesCard from "@/components/GamesCard";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import Navbar from "@/components/Navbar";
import { useCallback, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import F1RaceImage from "@/public/icons/f1race.png";
import BasketballImage from "@/public/icons/basketball.png";
import FootballImage from "@/public/icons/football.svg";
import Car1Image from "@/public/images/car1.png";
import { Game } from "@/redux/types";
import Link from "next/link";

export default function Home() {
  const { data: games, isLoading } = useGetAllGamesQuery();
  const [selectedGame, setSelectedGame] = useState<number>(0);

  const handleGameSelect = useCallback((index: number) => {
    setSelectedGame(index);
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col items-center gap-6 w-full bg-white text-primary max-w-md p-4 mt-[5rem]">
      <Navbar />

      <h1 className="text-2xl font-semibold uppercase">Predict Now</h1>

      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} showIndicators={true} showArrows={false}>
        <div className="mb-3 pb-2">
          <Image src={Car1Image} loading="lazy" alt="Car 1" />
        </div>
        <div>
          <Image src={Car1Image} loading="lazy" alt="Car 2" />
        </div>
        <div>
          <Image src={Car1Image} loading="lazy" alt="Car 3" />
        </div>
      </Carousel>

      <div className="flex w-full justify-between items-center text-sm px-4 rounded-md border-t shadow-md">
        {/* <div className={`flex flex-col items-center gap-0.5 py-2 border-b-2 cursor-pointer ${selectedGame === 0 ? 'border-primary' : 'border-transparent'}`} onClick={() => setSelectedGame(0)}>
          <Image src={F1RaceImage} loading="lazy" alt="F1 Race" />
          <p>F1 Race</p>
        </div>
        <div className={`flex flex-col items-center gap-0.5 py-2 border-b-2 cursor-pointer ${selectedGame === 1 ? 'border-primary' : 'border-transparent'}`} onClick={() => setSelectedGame(1)}>
          <Image src={BasketballImage} loading="lazy" alt="Basketball" />
          <p>Basketball</p>
        </div>
        <div className={`flex flex-col items-center gap-0.5 py-2 border-b-2 cursor-pointer ${selectedGame === 2 ? 'border-primary' : 'border-transparent'}`} onClick={() => setSelectedGame(2)}>
          <Image src={FootballImage} loading="lazy" alt="Football" />
          <p>Football</p>
        </div> */}
        {[
          { image: F1RaceImage, label: "F1 Race" },
          { image: BasketballImage, label: "Basketball" },
          { image: FootballImage, label: "Football" }
        ].map((game, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-0.5 py-2 border-b-2 cursor-pointer ${selectedGame === index ? 'border-primary' : 'border-transparent'
              }`}
            onClick={() => handleGameSelect(index)}
          >
            <Image src={game.image} loading="lazy" alt={game.label} />
            <p>{game.label}</p>
          </div>
        ))}
      </div>

      {
        games?.map((game: Game) => (
          <Link href={`/game/${game._id}`} key={game._id} className="w-full" passHref>
            <GamesCard game={game} />
          </Link>
        ))
      }
    </div>
  );
}
