"use client"
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

const ScanPage = () => {
    const [scanResult, setScanResult] = useState<string | null>(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        }, false);

        scanner.render(success, error);

        function success(result: string) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err: any) {
            console.error(err);
        }

        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-6 w-full bg-white text-primary max-w-md p-4">
            <h1 className="text-3xl font-semibold text-center">Scan QR Code</h1>
            <div id="reader" className="w-full"></div>
            {scanResult && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Scan Result:</h2>
                    <p className="text-lg">{scanResult}</p>
                </div>
            )}
        </div>
    );
};

export default ScanPage;