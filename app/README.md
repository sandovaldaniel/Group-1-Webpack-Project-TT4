Group-1 Webpack Project TT4

Overview

This project is a Webpack-based application that processes JavaScript, SCSS, and HTML using Webpack and associated plugins. It uses MiniCssExtractPlugin for styling and HtmlWebpackPlugin for dynamic HTML generation.

Prerequisites

Ensure that you have Node.js and npm installed on your system. You can check by running:

node -v
npm -v

If not installed, download and install Node.js from https://nodejs.org/.

Installation

Clone the repository:

git clone <repository-url>

Navigate into the project directory:

cd Group-1-Webpack-Project-TT4/app

Install dependencies:

npm install

Running the Project

To start the Webpack development server, run:

npm run start

This will start a local server, and you can access the project at:

http://localhost:8080

Building for Production

To generate a production build, run:

npm run build

The output files will be located in the dist folder.

Project Structure

Group-1-Webpack-Project-TT4/
├── app/
│   ├── src/
│   │   ├── products.js
│   │   ├── styles/
│   │   │   ├── main.scss
│   ├── webpack.config.js
│   ├── package.json
│   ├── node_modules/
├── dist/

License

This project is licensed under the MIT License.