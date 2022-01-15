import { Component } from 'react'

import './Home.css';

import { loadposts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 10,
    searchValue: ''
  }


  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadposts();
    const { page, postPerPage } = this.state

    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state
    const nextPage = (page + postPerPage)
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
    posts.push(...nextPosts)
    this.setState({ posts: posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target;
    const { searchValue, posts } = this.state;
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state

    const noMorePosts = (page + postPerPage) >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        )
      })
      :
      posts

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (
            <>
              <h1> searchValue : {searchValue} </h1> <br /> <br />
            </>
          )}
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts key={posts.id} posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existe nenhum post com {searchValue} no título </p>
        )}

        {!searchValue && (
          <div className="button-container">
            <Button disabled={noMorePosts} onClick={this.loadMorePosts} text="Load more posts" />
          </div>
        )}
      </section>
    );
  }
}

