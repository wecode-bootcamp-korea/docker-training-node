#!/bin/sh
#install_dependency_packages
npm install
#make_database
npx prisma migrate dev 
#upload_dependency_data
node dataUploader/dataUploader.js
#find_server_IPAddress
echo "your_server_IP_address"
echo  | ipconfig getifaddr en0
#run_server
npm start
