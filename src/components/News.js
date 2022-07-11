import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true
    }
  }

  async componentDidMount() {
    let url = 'https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e8666daa6ea7430b8deda5d4f61fff6f';
    let response = await fetch(url);
    let json = await response.json();
    console.log(json);
    this.setState({
      articles: json.articles,
      loading: false
    })
  }
  render() {
    return (
      <div className='container my-3'>

        <div className="row">

          {this.state.articles.map((data) => {
            return <div className='col-md-4' key={data.url}>
              <NewsItem title={data.title} description={data.description.slice(0.30)} urlToImage={data.urlToImage} url={data.url} />
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default News