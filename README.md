Documentation
https://g.co/gemini/share/35ddf9880cbc

## Running the Chat Application

To run the chat interface, follow these steps:

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    If you haven't already, install the project dependencies.
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
4.  **View the chat page:**
    Open your web browser and go to [http://localhost:3000/](http://localhost:3000/).

## Running the Backend Server

To run the Python backend, follow these steps:

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment (optional but recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\\Scripts\\activate`
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Create a `.env` file:**
   Create a file named `.env` in the `backend` directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY='your-api-key-here'
   ```

5.  **Start the development server:**
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be running at [http://localhost:8000](http://localhost:8000).