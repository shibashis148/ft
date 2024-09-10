"use client";
import { useGetAllGamesQuery } from "@/redux/services/gameService";
import Loader from "@/components/Loader";
import GamesCard from "@/components/GamesCard";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import F1RaceImage from "@/public/icons/f1race.png";
import BasketballImage from "@/public/icons/basketball.png";
import FootballImage from "@/public/icons/football.svg";
import Car1Image from "@/public/images/car1.png";
import { Game } from "@/redux/types";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isSuccess } = useGetAllGamesQuery();
  const games = data?.games;
  console.log(games);
  const [selectedGame, setSelectedGame] = useState<number>(0);

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col items-center gap-6 w-full bg-white text-primary max-w-md p-4 mt-[5rem]">
      <Navbar />

      <h1 className="text-2xl font-semibold uppercase">Predict Now</h1>

      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} showIndicators={true} showArrows={false}>
        <div className="mb-3 pb-2">
          <Image src={Car1Image} alt="Car 1" />
        </div>
        <div>
          <Image src={Car1Image} alt="Car 2" />
        </div>
        <div>
          <Image src={Car1Image} alt="Car 3" />
        </div>
      </Carousel>

      <div className="flex w-full justify-between items-center text-sm px-4 rounded-md border-t shadow-md">
        <div className={`flex flex-col items-center gap-0.5 py-2 border-b-2 cursor-pointer ${selectedGame === 0 ? 'border-primary' : 'border-transparent'}`} onClick={() => setSelectedGame(0)}>
          <Image src={F1RaceImage} alt="F1 Race" />
          <p>F1 Race</p>
        </div>
        <div className={`flex flex-col items-center gap-0.5 py-2 border-b-2 cursor-pointer ${selectedGame === 1 ? 'border-primary' : 'border-transparent'}`} onClick={() => setSelectedGame(1)}>
          <Image src={BasketballImage} alt="Basketball" />
          <p>Basketball</p>
        </div>
        <div className={`flex flex-col items-center gap-0.5 py-2 border-b-2 cursor-pointer ${selectedGame === 2 ? 'border-primary' : 'border-transparent'}`} onClick={() => setSelectedGame(2)}>
          <Image src={FootballImage} alt="Football" />
          <p>Football</p>
        </div>
      </div>

      {
        games?.map((game: Game) => (
          <Link href={`/game/${game._id}`} key={game._id} className="w-full">
            <GamesCard game={game} />
          </Link>
        ))
      }
    </div>
  );
}
