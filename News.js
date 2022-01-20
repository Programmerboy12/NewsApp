import React, { Component } from 'react'
import LoadingPage from './LoadingPage';
import Newsitem from './Newsitem';

import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: '5',
        category: 'general'
    }

    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} -NewsMonkey `;
      }
      async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad2a056b75f2426cbde63cf105a8b3d9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
      //   console.log(parsedData);
        this.setState({articles: parsedData.articles,
          totalarticles:parsedData.totalResults,
          loading: false})

      }
      async componentDidMount(){
        //   console.log("cdm");
        //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad2a056b75f2426cbde63cf105a8b3d9&page=1&pageSize=${this.props.pageSize}`;
        //   this.setState({loading: true});
        //   let data = await fetch(url);
        //   let parsedData = await data.json()
        // //   console.log(parsedData);
        //   this.setState({articles: parsedData.articles,
        //     totalarticles:parsedData.totalResults,
        //     loading: false})
        this.updateNews();
      }
   
      handlePrevClick = async()=>{
        //   console.log("Previous");
        //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad2a056b75f2426cbde63cf105a8b3d9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        //   this.setState({loading: true});
        //   let data = await fetch(url);
        //   let parsedData = await data.json()
        // //   console.log(parsedData);
        //   this.setState({
        //       page: this.state.page - 1,
        //       articles: parsedData.articles,
        //       loading: false
        //  })   
        this.setState({page: this.state.page - 1});
        this.updateNews();
      }
        // The function is a fetchMore data using
        // fetchMoreData = () => {
        //   this.setState({page:this.state.page + 1})
        //   this.updateNews()
        // };

      handleNextClick = async()=>{
        //   console.log("Next");
        //   if(this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize)){

        //   }
        //   else{
        //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad2a056b75f2426cbde63cf105a8b3d9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //   this.setState({loading: true});
        //   let data = await fetch(url);

        //   let parsedData = await data.json()
        // //   console.log(parsedData);
        //   this.setState({
        //       page: this.state.page + 1,
        //       articles: parsedData.articles,
        //       loading: false
        //   })  
        // }  
        this.setState({page: this.state.page - 1});
        this.updateNews();
      }
    render() {
    //   console.log("render")
        return (
            <div className="container my-3">
                <h1 className="text-center text-danger ">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Hadlines</h1>
                {this.state.loading && <LoadingPage/>}
                {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >

        </InfiniteScroll> */}
            <div className="row">     
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4 mask flex-center"  key={element.url}>   
                   <Newsitem  title={element.title?element.title.slice(0, 25):""} description={element.description?element.description.slice(0,85):""}imageUrl={element.urlToImage} newsUrl={element.url}
                              // the news name and author use a application function
                    author={element.author} date={element.publishedAt} source={element.source.name} ></Newsitem>
                </div>})}    
                
                <div className="container d-flex justify-content-between">
                <button disabled ={this.state.page<=1} type="button" className="btn btn-success" onClick={this.handlePrevClick} > &larr; Previous</button>
                <button disabled={this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-danger" onClick={this.handleNextClick}>Next &rarr;</button> 
                </div>
            </div>
            <footer className="page-footer font-small blue pt-4">
            
            <div className="footer-copyright text-center py-3">© 2022 Copyright
             <a href="http://localhost:3000/"> By ShivamCode</a>
                </div>
             </footer>
          </div>
        )
    }
}
