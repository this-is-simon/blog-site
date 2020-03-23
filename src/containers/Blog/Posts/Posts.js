import React, {Component} from 'react';
import Post from "../../../components/Post/Post";
import './Posts.css'
import axios from "../../../axios";


class Posts extends Component {
    state = {
        posts: [],
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

    render() {
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
            <section className="Posts">
                {posts}
            </section>
        )
    }
};

export default Posts;