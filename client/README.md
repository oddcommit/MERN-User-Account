Blog Application
This is a React-based blog application that allows users to create, read, update, and delete blog posts. It also includes features like user authentication, tracking the number of views and likes on each post, and sorting/filtering blog posts based on various criteria.

Technologies Used
React
Redux
TypeScript
Tailwind CSS
Features
Authentication
Users can log in to the application using their email address, full name, and password. This ensures that only authorized users are able to create, edit, and delete blog posts.

Dashboard Page
The dashboard page displays a list of all blog posts, sorted by date created by default. Users can filter the list by most viewed or most liked posts if they prefer. The dashboard page also includes links to create a new blog post or view the user's own posts.

Create Blog Page
The create blog page allows users to create a new blog post. They can provide a title, body text, an image URL, and other details like watches and likes (which are initially set to 0).

Update Page
The update page enables users to edit the contents of an existing blog post. They can modify the title, body text, image URL, and other properties.

Blog Detail Page
The blog detail page displays all the contents of a specific blog post, including the title, body text, image, watches, and likes. If the user viewing the page is not the creator of the post, the number of watches will increase with each visit.

Likes
When a user clicks the like button on a blog post, the number of likes will increase by one. However, a user must refresh the page to see the updated count.

Sort/Filter Feature
Users can sort the blog posts on the dashboard page by recent, most viewed, or most liked. Users can also filter the posts by specific keywords.

User Page
The user page displays all the blog posts created by a specific user.
