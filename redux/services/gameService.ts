import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Game } from "../types"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const gameApi = createApi({
    reducerPath: "gameApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllGames: builder.query<Game[], void>({
            query: () => "games",
        }),
        getGameById: builder.query<Game, string>({
            query: (gameId) => `game/${gameId}`,
        })
    })
})

export const { useGetAllGamesQuery, useGetGameByIdQuery } = gameApi;
