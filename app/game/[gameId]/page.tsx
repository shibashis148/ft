"use client"
import Image from "next/image";
import QuizImage from "@/public/images/quiz.png";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetGameByIdQuery } from "@/redux/services/gameService";
import Loader from "@/components/Loader";
import OTPInput from "react-otp-input";
import { useSubmitGameMutation } from "@/redux/services/gameSubmission";
import { GameSubmission } from "@/redux/types";
import { useGetCouponCodeQuery } from "@/redux/services/couponCode";

const GamePage = () => {
    const { gameId } = useParams();
    const router = useRouter();
    const { data: game, isLoading, isError } = useGetGameByIdQuery(gameId as string);
    const [disableSubmit, setDisableSubmit] = useState(true);

    const [steps, setSteps] = useState<number>(1);
    const [couponCode, setCouponCode] = useState<string>('');
    const [tableNumber, setTableNumber] = useState<string>('');

    const [userOption, setUserOption] = useState<string[]>([]);

    const [submitGame, { isLoading: isSubmitLoading, isSuccess, isError: isSubmitError }] = useSubmitGameMutation();

    const { data: couponCodeData, isLoading: isCouponCodeLoading, isError: isCouponCodeError } = useGetCouponCodeQuery(couponCode);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if (steps === 1) {
            const allOptionsSelected = userOption.length === 3 && userOption.every(option => option !== '');
            setDisableSubmit(!allOptionsSelected);
        }
        if (steps === 2) {
            setDisableSubmit(couponCode.length !== 4);
        }
        if (steps === 3) {
            setDisableSubmit(tableNumber.length === 0 || couponCode.length !== 4);
        }

    }, [userOption, steps, couponCode, tableNumber]);

    const handleSubmit = () => {
        if (steps === 2) {
            if (isCouponCodeLoading) return;
            if (isCouponCodeError || !couponCodeData) {
                setErrorMsg("Invalid coupon code");
                return;
            }
            setErrorMsg("Coupon code applied successfully");
            setSteps(3);
        }
        if (steps === 3) {
            const submitData: Partial<GameSubmission> = {
                gameId: gameId as string,
                userId: "user1",
                restaurantId: "Laxmi Restaurant",
                couponCode,
                tableNumber,
                userOptions: userOption
            }
            submitGame(submitData as GameSubmission);
            setSteps(4);
        }
    }

    if (isLoading) return <Loader />;
    if (isError || isSubmitError) return <div className="text-center text-red-500">Error</div>;
    if (!game) return <div className="text-center text-red-500">Game not found</div>;
    return (
        <>
            {
                steps === 1 && <div className="flex flex-col items-center justify-between bg-white w-full max-w-md p-4">
                    <div className="flex flex-col justify-center gap-4 w-full">
                        <h1 className="text-3xl font-semibold text-center">Rank them in the order</h1>
                        <h1 className="text-xl font-medium text-center">{game?.title}</h1>
                        <p className="text-sm text-gray-500 text-center">{game?.event}</p>
                        <Image src={QuizImage} alt="Quiz" className="w-full" />

                        <p className="text-xl">Select the top 3 winners in the order :</p>
                        <div className="flex flex-col items-center justify-center gap-4 w-full">
                            {[1, 2, 3].map((item: number, index: number) => (
                                <div key={item} className="flex items-center gap-2 w-full">
                                    <span className="text-xl font-medium">{item}</span>
                                    <select
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                        value={userOption[index] || ''}
                                        onChange={(e) => {
                                            const newUserOption = [...userOption];
                                            newUserOption[index] = e.target.value;
                                            setUserOption(newUserOption);
                                        }}
                                    >
                                        <option value="">Select winners</option>
                                        {game?.options.filter((opt: string) =>
                                            !userOption.some(selected => selected === opt) ||
                                            userOption[index] === opt
                                        ).map((opt: string, optIndex: number) => (
                                            <option key={optIndex} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button disabled={disableSubmit} onClick={() => setSteps(2)}>
                        Proceed
                    </Button>
                </div>
            }
            {
                (steps === 2 || steps === 3) && <div className="flex flex-col items-center justify-between gap-6 w-full bg-white text-primary max-w-md p-4">

                    <h1 className="text-3xl font-semibold text-center">Apply Coupoun Code  to submit your predicitions</h1>

                    <div className="flex flex-col items-center justify-center gap-6 w-full" id="coupon-code">
                        <OTPInput
                            value={couponCode}
                            onChange={setCouponCode}
                            numInputs={4}
                            renderInput={(props) => <input {...props} disabled={steps === 3} />}
                            inputStyle={{ width: '50px', height: '50px', border: '1px solid #ccc', borderRadius: '5px', margin: '0 5px' }}
                        />
                        {errorMsg && <p className={`text-center ${steps === 3 ? "text-green-500" : "text-red-500"}`}>{errorMsg}</p>}

                        {
                            steps === 3 && <div className="flex flex-col items-center justify-center gap-2">
                                <p>Enter your table number</p>
                                <input type="text" className="rounded-md border border-gray-500 text-center focus:outline-none h-12" placeholder="XXX" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} />
                            </div>
                        }
                    </div>

                    <Button disabled={disableSubmit || isSubmitLoading} onClick={handleSubmit}>
                        {steps === 3 ? "Submit" : "Next"}
                    </Button>
                </div>
            }
            {
                (steps === 4 && isSuccess) && <div className="flex flex-col items-center justify-center text-center gap-6 w-full bg-white text-primary max-w-md p-4">
                    <h1 className="text-3xl font-semibold text-center text-green-500">Submitted successfully</h1>
                    <p className="text-xl">Your predictions have been submitted successfully.</p>
                    <Button onClick={() => router.push('/')}>Play another game</Button>
                    <Button onClick={() => router.push('/results')}>View results</Button>
                </div>
            }
        </>
    )
}

export default GamePage;