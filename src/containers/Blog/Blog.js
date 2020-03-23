import React, { Component } from 'react';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 10);
                const updatedPosts = posts.map(post => {
                        return {
                            ...post,
                            author: 'Simon'
                        }
                    }
                );
                this.setState({posts: updatedPosts})
            })
            .catch(error => {
                console.log('Error:', error);
                this.setState({error: true});
            });
    };

    handlePostClicked = (id) => {
        this.setState({selectedPostId: id})
    };

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrang.</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        id={post.id}
                        clicked={() => {this.handlePostClicked(post.id)}}
                    />
                )
            });
        }

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
            </div>
        );
    }
}

export default Blog;