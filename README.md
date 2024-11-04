# Chrome Extension Project: LLM Assistant

This project is a Chrome extension that integrates a Large Language Model (LLM) to assist users by processing web page content and responding to user queries.

## Front-End

The front-end of the Chrome extension is built using React. It provides a user-friendly interface that allows users to interact with the LLM based on the content of the current web page.

### Key Features
- Captures page content excluding the extension's own interface.
- Sends user queries along with the page content to the back-end.
- Displays responses from the LLM in real-time.

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/kongchenglc/LLamaChromeSidebar.git
   cd LLamaChromeSidebar
   ```

2. Install dependencies:
   ```bash
   yarn
   ```

3. Build the project:
   ```bash
   yarn run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode."
   - Click on "Load unpacked" and select the `dist` directory of your project.

### Usage
- Click on the extension icon that is at the right bottom corner of the window to open the sidebar.
- The extension automatically captures the content of the page.
- Enter your query and press enter to get a response from the LLM.

## Back-End

The back-end is built using Koa.js and handles requests from the front-end to communicate with the LLM.

### Key Features
- Processes incoming requests from the front-end.
- Streams responses from the LLM back to the front-end in real-time.
- Handles CORS for requests coming from the extension.

### Setup
1. Navigate to the back-end directory:
   ```bash
   git clone https://github.com/kongchenglc/LLamaChromeSidebarBackend.git
   cd LLamaChromeSidebarBackend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory and add your Hugging Face API token:
     ```
     HF_API_TOKEN=<your-token>
     ```

4. Start the server:
   ```bash
   npm start
   ```

### API Endpoint
- `POST /chat/`
  - Accepts JSON payloads with `pageContent` and `message`.
  - Returns streamed responses from the LLM.

## Installation

To run the project, you need to set up both the front-end and back-end as described above. Make sure the back-end server is running while using the Chrome extension.

## Usage

1. Open a webpage in Chrome.
2. Click on the extension icon to activate the sidebar.
3. Enter your question or request and press enter.
4. Receive a response from the LLM based on the content of the page.

## License

This project is licensed under the MIT License.