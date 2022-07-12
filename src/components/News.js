import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e8666daa6ea7430b8deda5d4f61fff6f&page=${this.state.page}&pageSize=20`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json);
    this.setState({
      articles: json.articles,
      loading: false,
      totalArticals: json.totalResults,

    })
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e8666daa6ea7430b8deda5d4f61fff6f&page=${this.state.page - 1}&pageSize=20`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json);
    this.setState({
      articles: json.articles,
      loading: false,
      page: this.state.page - 1,
    })
  }
  handleNextClick = async () => {
    if (this.state.page + 1 > Math
      .ceil(this.state.totalArticals / 20)) {

    } else {

      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e8666daa6ea7430b8deda5d4f61fff6f&page=${this.state.page + 1}&pageSize=20`;
      let response = await fetch(url);
      let json = await response.json();
      console.log(json);
      this.setState({
        articles: json.articles,
        loading: false,
        page: this.state.page + 1,
      })
    }

  }
  render() {
    return (
      <div className='container my-3'>

        <div className="row">

          {this.state.articles.map((data) => {
            return <div className='col-md-4' key={data.url}>
              <NewsItem title={data.title} description={data.description} urlToImage={data.urlToImage} url={data.url} />
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math
            .ceil(this.state.totalArticals / 20)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News