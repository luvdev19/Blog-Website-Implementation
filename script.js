// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with HTML5",
        content: "HTML5 is the latest evolution of the standard that defines HTML. It introduces many new features that make web development more efficient and powerful. In this post, we'll explore the basics of HTML5 and how you can start using it in your projects today.",
        date: "October 15, 2023",
        image: "https://via.placeholder.com/800x400?text=HTML5",
        category: "Web Development",
        comments: [
            { name: "John Doe", date: "October 16, 2023", message: "Great introduction to HTML5! Looking forward to more posts." },
            { name: "Jane Smith", date: "October 17, 2023", message: "Very helpful for beginners. Thanks for sharing!" }
        ]
    },
    {
        id: 2,
        title: "CSS Grid Layout: A Complete Guide",
        content: "CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward. This guide will walk you through all the key concepts with practical examples.",
        date: "October 10, 2023",
        image: "https://via.placeholder.com/800x400?text=CSS+Grid",
        category: "Web Development",
        comments: [
            { name: "Alex Johnson", date: "October 11, 2023", message: "I've been struggling with layouts for years. This is a game-changer!" }
        ]
    },
    {
        id: 3,
        title: "JavaScript ES6 Features You Should Know",
        content: "ECMAScript 2015 or ES6 is a significant update to the JavaScript language. It introduced many new features that make JavaScript more powerful and easier to work with. In this post, we'll cover the most important ES6 features that every developer should know.",
        date: "October 5, 2023",
        image: "https://via.placeholder.com/800x400?text=JavaScript+ES6",
        category: "Web Development",
        comments: []
    }
];

// DOM elements
const blogPostsContainer = document.getElementById('blogPosts');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Display blog posts
function displayBlogPosts(posts) {
    blogPostsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';
        
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="post-content">
                <h2>${post.title}</h2>
                <div class="post-meta">
                    <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
                    <span><i class="far fa-folder"></i> ${post.category}</span>
                </div>
                <p>${post.content}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
            <div class="comment-section">
                <h3>Comments (${post.comments.length})</h3>
                <form class="comment-form" data-post-id="${post.id}">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <textarea name="message" placeholder="Your Comment" required></textarea>
                    <button type="submit">Post Comment</button>
                </form>
                <div class="comments-list" id="comments-${post.id}">
                    ${post.comments.map(comment => `
                        <div class="comment">
                            <div class="comment-header">
                                <span>${comment.name}</span>
                                <span>${comment.date}</span>
                            </div>
                            <div class="comment-content">
                                ${comment.message}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        blogPostsContainer.appendChild(postElement);
    });
    
    // Add event listeners to comment forms
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', handleCommentSubmit);
    });
}

// Handle comment submission
function handleCommentSubmit(e) {
    e.preventDefault();
    
    const postId = parseInt(e.target.dataset.postId);
    const nameInput = e.target.elements.name;
    const messageInput = e.target.elements.message;
    
    const newComment = {
        name: nameInput.value,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        message: messageInput.value
    };
    
    // Find the post and add the comment
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        post.comments.push(newComment);
        
        // Update the comments list
        const commentsList = document.getElementById(`comments-${postId}`);
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-header">
                <span>${newComment.name}</span>
                <span>${newComment.date}</span>
            </div>
            <div class="comment-content">
                ${newComment.message}
            </div>
        `;
        commentsList.appendChild(commentElement);
        
        // Reset the form
        e.target.reset();
    }
}

// Search functionality
function searchPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        displayBlogPosts(blogPosts);
        return;
    }
    
    const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.content.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm)
    );
    
    displayBlogPosts(filteredPosts);
}

// Event listeners
searchBtn.addEventListener('click', searchPosts);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchPosts();
    }
});

// Initialize the page
displayBlogPosts(blogPosts);