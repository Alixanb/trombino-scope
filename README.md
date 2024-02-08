# Trombino Scope Documentation

## Author
- Name: Alixan BALU
- Contact: alixan.balu@etu.unistra.fr

## Description
This project is a web application developed using Next.js, a popular JavaScript library for building client-side and server-side web applications.

## Installation
- Clone the GitLab repository:
    ```
    git clone https://git.unistra.fr/but3dw-front-balu/trombino-scope.git
    cd trombino-scope
    ```
- Clone the Docker AI:
    ```
    git clone https://git.unistra.fr/but3dw-front-balu/trombino-scope.git
    ```
    (The location of the AI does not matter.)
- Make sure to have Docker Desktop installed before proceeding.

### Installing Dependencies
Make sure to first launch the Docker project before the Next.js project.

#### Artificial Intelligence and its Docker Container
Navigate to your Docker with CMD.
Then execute these 2 commands:
- Build the image:
    ```
    docker image build . -t face-image-quality:tag
    ```
- Run the image:
    ```
    docker run --cpus="16" -it --rm -p 3000:3000 face-image-quality:tag
    ```

#### Next.js Application
```
npm install
```
Copy the `.env.example` file to `.env` and configure the environment variables according to your needs.
Refer to 'About the .env' section to find where to obtain this information.

## Execution
To run the project in development mode:
```
npm run dev
```
Open your browser and access the address provided by Next.js.

## Deployment
To create an optimized version for production:
```
npm run build
```
To run the application in production mode:
```
npm start
```

## About the .env
Here we'll see how to find each line of .env to add to your project:

### Supabase
For Supabase links, you'll find all this in YourSupabaseProject > Settings > API.
```
NEXT_PUBLIC_SUPABASE_URL = Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY = Project API keys
```

### Uploadthing
Go [here](https://uploadthing.com/dashboard).
Make sure you have an account and a project. Then, in your project, go to API keys, and you'll find the keys.
The names are self-explanatory.

## Project Structure
The project structure follows the logic of Next.js with the app routers system. See documentation [here](https://nextjs.org/docs/pages/building-your-application/routing).

## Contribution
We welcome contributions! Feel free to submit a Pull Request or open an issue to report problems or suggest improvements.

## Guidelines
Please make sure to follow the coding style and conventions already in place.
Ensure that your code passes all tests before submitting a Pull Request.
Document any new features or changes thoroughly.

## License
This project is licensed under the [MIT License]. See the LICENSE file for more details.
