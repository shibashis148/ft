import Button from "@/components/Button";

const CouponPage = () => {
    return (
        <div className="flex flex-col items-center justify-between gap-6 w-full bg-white text-primary max-w-md p-4">

            <h1 className="text-3xl font-semibold text-center">Apply Coupoun Code  to submit your predicitions</h1>

            <div className="flex gap-2 text-2xl font-bold">
                <input value={4} type="text" className="rounded-md border border-gray-500 text-center focus:outline-none w-16 h-16" />
                <input value={5} type="text" className="rounded-md border border-gray-500 text-center focus:outline-none w-16 h-16" />
                <input value={9} type="text" className="rounded-md border border-gray-500 text-center focus:outline-none w-16 h-16" />
                <input value={'A'} type="text" className="rounded-md border border-gray-500 text-center focus:outline-none w-16 h-16" />
            </div>

            <Button />
        </div>
    )
}

export default CouponPage;