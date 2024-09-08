# Interactive Storytelling Platform

## Project Summary

**Project Name**: Interactive Storytelling Platform

### Project Overview

An interactive storytelling platform where users can engage with stories through choices that affect the narrative. The project includes both frontend and backend components, leveraging modern technologies to provide a seamless user experience.

### Frontend

- **Technology**: React.js
- **Features**:
  - **Story List**: Displays a list of available stories with options to like, dislike, and view details.
  - **Story Details**: Shows the full content of a selected story, including choices and user interactions.
  - **Interactive Elements**: Users can select story paths, like or dislike stories, and see how their choices affect the narrative.
  - **State Management**: Manages state with React hooks to keep the UI updated based on user interactions.

### Backend

- **Technology**: Node.js with Express
- **Database**: MongoDB
- **Features**:
  - **Story Management**:  operations for stories, including creation,  and deletion.
  - **User Interactions**: Handles user actions like liking and disliking stories.
  - **Authentication**: Secures endpoints using JWT tokens to ensure that only authenticated users can perform certain actions.
  - **Data Models**:
    - **Story Model**: Includes fields for title, content, choices, author, and user interactions (likes and dislikes).
    - **Choice Model**: Represents choices within a story with paths leading to different content.
  
### APIs
- **POST /api/stories/create**:  
  - **Description**: Creates a new story.  
  - **Authentication**: Required (JWT token).  
  - **Request Body**: 

- **DELETE /api/stories/delete/:id**:  
  - **Description**: Deletes a story by its ID.  
  - **Authentication**: Required (JWT token).  
  - **Response**: Success message or an error if the story is not found.

- **GET /api/stories/**:  
  - **Description**: Retrieves a list of all stories.  
  - **Authentication**: Not required.  
  - **Response**: An array of stories, including title, content, and user interactions (likes, dislikes).

- **POST /api/stories/like/:id**:  
  - **Description**: Allows an authenticated user to like a story.  
  - **Authentication**: Required (JWT token).  
  - **Response**: Returns the updated like count for the story.

- **POST /api/stories/dislike/:id**:  
  - **Description**: Allows an authenticated user to dislike a story.  
  - **Authentication**: Required (JWT token).  
  - **Response**: Returns the updated dislike count for the story.
- **Error Handling**: Provides appropriate error responses for invalid operations or server issues.

### Key Challenges

- **Token Management**: Ensuring secure and valid token handling for user authentication.
- **Interactive Features**: Implementing dynamic story choices and keeping the state updated.
- **Error Handling**: Properly managing errors and providing feedback to users.

### Technologies Used

- **Frontend**: React.js, Axios for API calls.
- **Backend**: Node.js, Express, MongoDB for data storage, JWT for authentication.
- **Deployment**: Deployed on Google Cloud with Kubernetes.

### Project Status

Completed

### Additional Features

- **Story Metrics**: Tracks user interactions with stories, including popular choices and time spent on different sections.

### Conclusion

The interactive storytelling platform successfully integrates user-driven narratives with dynamic content updates. The project demonstrates proficiency in modern web technologies, state management, and API design.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Google Cloud account (for deployment)

### Installation



1. **Install dependencies**:
    - For the frontend:
      ```bash
      cd frontend
      npm install
      ```
    - For the backend:
      ```bash
      cd backend
      npm install
      ```

2. **Configure environment variables**:
   - Create a `.env` file in the `backend` directory and add your environment variables, such as `JWT_SECRET` and `MONGO_URI`.

3. **Run the application**:
   - For the frontend:
     ```bash
     cd frontend
     npm start
     ```
   - For the backend:
     ```bash
     cd backend
     npm start
     ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend API.
