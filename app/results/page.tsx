"use client"
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import RecordCard from "@/components/RecordCard";
import { useGetAllGameSubmissionsQuery } from "@/redux/services/gameSubmission";
import { GameSubmission } from "@/redux/types";

const ProfilePage = () => {
    const { data: submissions, isLoading } = useGetAllGameSubmissionsQuery();

    if (isLoading) return <Loader />;
    return (
        <div className="flex flex-col items-center gap-6 w-full bg-white text-primary max-w-md p-4 mt-[5rem]">
            <Navbar />

            <h1 className="text-2xl font-semibold text-left w-full">Records</h1>

            <div className="flex flex-col gap-4 w-full">
                {
                    submissions?.map((submission: GameSubmission) => (
                        <RecordCard key={submission._id} submission={submission} />
                    ))
                }
            </div>

        </div>
    )
}

export default ProfilePage;