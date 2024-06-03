import QRcode from 'qrcode';
import readlineSync from 'readline-sync';
import fs from 'fs';

const url = readlineSync.question("enter url of it :");
if (url.slice(-4) === ".com"  ) {
    const file = readlineSync.question("enter file name :");


    if (fs.existsSync(file)) {
        console.log(`file alreadt exist try with different name ${file}`);
    }
    else {
        QRcode.toFile(file, url, (err) => {
            if (err) {
                console.log("error found", err)
            }
            console.log(`file has been generated successfully ${file}`)
        });
    }
}
else {
    console.log("error founded that name is incorrect of the url");
}