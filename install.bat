@echo off
color 0a

title "Banking App Server Installer"

echo "Make sure you added your mongoDB connection string properly in the dotenv_template file!"
echo "If you did not, please do so now and then run this script again."

input /b /p "Press any key to continue..."

:: Lets check if the user has added the mongoDB connection string properly
:: by checking if the file contains the string DB_URI = ""
:: If it does not, we will ask the user to add it and then run the script again
findstr /i "DB_URI = \"\"" dotenv_template > nul
if %errorlevel% equ 1 (
    echo "Please add your mongoDB connection string to the dotenv_template file and then run this script again."
    echo "If you do not know how to get your mongoDB connection string, please refer to the README.md file."
    echo "Press any key to exit..."
    pause > nul
    exit
)

:: Lets check if there are previous folders for the repositories
if exist "banking-app-backend" (
    color 0c
    echo "banking-app-backend folder already exists. Removing it..."
    rmdir /s /q banking-app-backend
    color 0a
)

if exist "banking-app-frontend" (
    color 0c
    echo "banking-app-frontend folder already exists. Removing it..."
    rmdir /s /q banking-app-frontend
    color 0a
)

echo "Cloning the repositories..."
git clone https://github.com/goktug7913/banking-app-backend.git
git clone https://github.com/goktug7913/banking-app-frontend.git
echo "Repositories cloned!"

echo "Installing the backend..."
cd banking-app-backend
npm install
echo "Backend installed!"

echo "Installing the frontend..."
cd ../banking-app-frontend
npm install
echo "Frontend installed!"

:: Now we need to copy the .env file to the backend folder
cd ..
copy dotenv_template banking-app-backend\.env
echo ".env file copied!"

echo "All done! You can now run the backend and frontend seperately."
echo "To run the backend, go to the banking-app-backend folder and run 'npm run dev'"
echo "To run the frontend, go to the banking-app-frontend folder and run 'npm start'"

pause > nul
exit