import Image from "next/image";
import ProfileImage from "@/public/images/profile.png";
import WalletImage from "@/public/icons/wallet.png";

const Navbar = () => {
    return (
        // <div className="flex flex-col items-center justify-center w-full mb-16 z-50">
        //     <div className="fixed top-4 max-w-[calc(28rem-2rem)] flex justify-between w-full items-center bg-gray-100 p-2 rounded-md border border-white shadow-md">
        //         <div className="flex items-center gap-2">
        //             <Image src={ProfileImage} alt="profile" width={40} height={40} className="rounded-full" />
        //             <div>
        //                 <p className="text-md font-semibold">John Doe</p>
        //                 <p className="text-xs text-gray-500">Bengaluru, India</p>
        //             </div>
        //         </div>
        //         <Image src={WalletImage} alt="wallet" width={32} height={32} />
        //     </div>
        // </div>
        <div className="bg-white fixed top-0 left-1/2 -translate-x-1/2 max-w-md w-full z-50 flex justify-between items-center p-4">
            <div className="flex justify-between items-center w-full rounded-md border shadow-md p-2">
                <div className="flex items-center gap-2">
                    <Image src={ProfileImage} alt="profile" width={40} height={40} className="rounded-full" />
                    <div>
                        <p className="text-md font-semibold">John Doe</p>
                        <p className="text-xs text-gray-500">Bengaluru, India</p>
                    </div>
                </div>
                <Image src={WalletImage} alt="wallet" width={32} height={32} />
            </div>
        </div>
    )
}

export default Navbar;