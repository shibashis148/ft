import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { GameSubmission } from "../types"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const gameSubmissionApi = createApi({
    reducerPath: "gameSubmissionApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        submitGame: builder.mutation<GameSubmission, GameSubmission>({
            query: (gameSubmission) => ({
                url: "game-submission",
                method: "POST",
                body: gameSubmission
            })
        }),
        getAllGameSubmissions: builder.query<GameSubmission[], void>({
            query: () => "game-submissions"
        })
    })
})

export const { useSubmitGameMutation, useGetAllGameSubmissionsQuery } = gameSubmissionApi;