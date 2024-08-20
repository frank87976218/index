function startScanning() {
    const html5QrCode = new Html5Qrcode("reader");

    // This method will start scanning using the back camera
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,    // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }  // Optional, scanning box
        },
        qrCodeMessage => {
            // When the QR code is successfully scanned
            document.getElementById('result').innerText = `Scanned: ${qrCodeMessage}`;
            
            // Parse the URL to get the data parameter
            const url = new URL(qrCodeMessage);
            const dataParam = url.searchParams.get("data");
            if (dataParam) {
                alert(`Data: ${dataParam}`);
            } else {
                alert("No data parameter found in the URL.");
            }

            // Stop the scanner after successful scan
            html5QrCode.stop().then(() => {
                console.log("QR code scanning stopped.");
            }).catch(err => {
                console.error("Error stopping the scanner", err);
            });
        },
        errorMessage => {
            // Optionally, handle errors and feedback
            console.warn(`QR code scan error: ${errorMessage}`);
        }
    ).catch(err => {
        console.error("Unable to start scanning", err);
    });
}
