function startScanning() {
    const html5QrCode = new Html5Qrcode("reader");

    // Start scanning using the back camera
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,    // Optional, frame per seconds for barcode scanning
            qrbox: { width: 250, height: 100 }  // Optional, scanning box size, adjusted for barcodes
        },
        codeMessage => {
            // When the barcode is successfully scanned
            document.getElementById('result').innerText = `Scanned: ${codeMessage}`;
            
            // If the barcode is expected to contain a URL, you can parse it
            try {
                const url = new URL(codeMessage);
                const dataParam = url.searchParams.get("data");
                if (dataParam) {
                    alert(`Data: ${dataParam}`);
                } else {
                    alert("No data parameter found in the URL.");
                }
            } catch (e) {
                alert("Scanned code is not a valid URL.");
            }

            // Stop the scanner after successful scan
            html5QrCode.stop().then(() => {
                console.log("Barcode scanning stopped.");
            }).catch(err => {
                console.error("Error stopping the scanner", err);
            });
        },
        errorMessage => {
            // Optionally, handle errors and feedback
            console.warn(`Barcode scan error: ${errorMessage}`);
        }
    ).catch(err => {
        console.error("Unable to start scanning", err);
    });
}