import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CouponCode } from "../types"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const couponCodeApi = createApi({
    reducerPath: "couponCodeApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCouponCode: builder.query<CouponCode, string>({
            query: (couponCode) => `couponCode/${couponCode}`
        })
    })
})

export const { useGetCouponCodeQuery } = couponCodeApi;