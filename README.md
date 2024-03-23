# Cloud Native Web Application

## Technologies used

Google Cloud Platform(GCP), Node.js, Express.js, Cloud SQL, Terraform, GitHub CI/CD, Packer

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- npm (Node Package Manager): Included with Node.js installation
  
## Installation

1. Clone the repository:

    ```
    git clone git@github.com:CloudComputing-AayushS/webapp.git
    ```

2. Navigate to the project directory:

    ```
    cd webapp
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Set up the database:

    - Create a MySQL database.
    - Update the database configuration in config.js or .env file with your MySQL database credentials.


5. Set environment variables:

    Create a .env file in the root directory and add the following:

    ```env
    DB_USERNAME=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DATABASE=your_mysql_database
    ```
    

## Usage

To run the application locally, use the following command:

```
npm run dev
```

## Reference 
1. https://www.youtube.com/watch?v=btWo1jxFwp8
2. https://sequelize.org/docs/v6/other-topics/legacy/


## Author

Aayush Shetty
