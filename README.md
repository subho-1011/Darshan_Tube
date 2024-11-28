# DarshanTube Frontend

Welcome to the DarshanTube Frontend repository! This project powers the user-facing side of DarshanTube, a video streaming platform built for a seamless and engaging video experience.

You can view the live website [https://darshantube.vercel.app](https://darshantube.vercel.app/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack and Dependencies](#tech-stack-and-dependencies)
- [License](#license)

## Introduction

DarshanTube is a video streaming platform that allows users to watch and upload videos. This repository contains the frontend code for the project. The frontend is built using modern web technologies to ensure a smooth and responsive user experience. It includes features such as user authentication, video upload and playback, and user profiles.

## Features

### 1. User Authentication

- **Sign Up**: Users can create a new account using their email address and a password.
- **Login**: Registered users can log in using their email and password.
- **Password Recovery**: Users can reset their password if they forget it.
- **Email Verification**: New users receive a verification email to confirm their email address.
- **Session Management**: Secure session handling to keep users logged in across sessions.

### 2.Video Upload and Playback

- **Video Upload**: Users can upload videos in various formats. The platform supports large file uploads and provides progress feedback during the upload process.
- **Video Playback**: Users can watch videos with a built-in player that supports features like play, pause, seek, and volume control. The player is optimized for smooth playback and quick loading times.
- **Video Thumbnails**: Automatically generate and display video thumbnails for easy browsing.
- **Video Metadata**: Users can add titles, descriptions, and tags to their videos to make them easily searchable.

### 3. User Profiles

- **Profile Creation**: Users can create and customize their profiles with a profile picture, bio, and other personal information.
- **Profile Management**: Users can update their profile information and manage their uploaded videos.
- **Follow System**: Users can follow other users to stay updated with their latest uploads.
- **Watch History**: Users can view their watch history and easily rewatch previously viewed videos.

### 4. Search and Discovery

- **Search Functionality**: Users can search for videos by title, description, or tags.
- **Recommendations**: The platform provides personalized video recommendations based on user preferences and watch history.
- **Trending Videos**: Users can discover trending videos based on views and likes.

### 5. Comments and Likes

- **Comment System**: Users can comment on videos to share their thoughts and engage with other users.
- **Like System**: Users can like videos to show their appreciation and support for the content creators.

### 6. Community Posts

- **Post Creation**: Users can create posts to share updates, news, or any content related to their interests.
- **Post Management**: Users can edit or delete their own posts.
- **Commenting**: Other users can comment on posts to engage in discussions.
- **Liking**: Users can like posts to show their appreciation.
- **Sharing**: Users can share posts with others to spread interesting content.

### 7. Watch History and Liked Videos

- **Watch History**: Users can view a list of videos they have previously watched, making it easy to find and rewatch their favorite content.
- **Liked Videos**: Users can access a collection of videos they have liked, allowing them to quickly find and enjoy content they have appreciated in the past.
- **Watch Later**: Users can add videos to a "Watch Later" list to save content they want to view at a later time.

### 8. Playlists

- **Create Playlists**: Users can create custom playlists to organize their favorite videos.
- **Add to Playlist**: Users can add videos to their playlists for easy access and viewing.
- **Manage Playlists**: Users can edit the title and description of their playlists, reorder videos, and remove videos from playlists.
- **Share Playlists**: Users can share their playlists with others via a shareable link.
- **Public and Private Playlists**: Users can set their playlists to be public or private, allowing them to control who can view their playlists.

## Tech Stack and Dependencies

The project leverages cutting-edge technologies for scalability, performance, and developer experience:

### Core Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for routing in React applications.
- **Next.js**: A React framework for server-side rendering and generating static websites.
- **Redux**: A state management library for JavaScript apps.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Query**: A library for fetching, caching, and updating asynchronous data in React applications.
- **Zod**: A JavaScript schema builder for value parsing and validation.
- **React Form Hook**: A library for building forms in React.
- **React Player**: A React component for playing media from various sources.
- **Vercel**: A cloud platform for static sites and serverless functions, used for deployment.

## Project Pages

### Authentication

- **/auth/login**: User login page.
- **/auth/register**: User registration page.
- **/auth/verify-email**: Email verification page.

### Profile

- **/profile**: User profile management.
- **/profile/settings**: User account settings.

### Channels

- **/channel**: Displays a list of all channels.
- **/channel/[username]**: Displays a specific user's channel.
- **/channel/[username]/publish**: Page for video upload.
- **/channel/[username]/videos**: Shows all videos uploaded by the user.

### Community and Engagement

- **/community-posts**: Displays community posts.
- **/help-and-support**: Help and support page for user assistance.
- **/liked-videos**: Shows videos liked by the user.
- **/playlists**: Shows playlist of user.
- **/notifications**: Displays user notifications.

### Video Playback

- **/watch/[slug]**: Video playback page with video details and engagement options.

### Search

- **/search**: Search results page for videos and channels.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
