import React, { Component } from 'react'

export default class Newsitem extends Component {
    render() {
        let {title, description,imageUrl , newsUrl, author ,date , source} = this.props;
        return (
            <div className="my-4">
                
                <div className="card">
                <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex:'1'}} > {source}
                        </span>
                    <img src={imageUrl}className="card-img-top" alt="..."/>
                    <div className ="card-body">
                    <h5 className ="card-title">{title} .</h5>
                    <p className ="card-text">{description}...</p>
 {/* thw use in a author name a reduce in up to date in all content find a name and unoknown name */}
                    <p className="card-text"><small className="text-muted">by {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className ="btn btn-sm btn-primary ">Learn More</a>
                    </div>
                </div>
            </div>
        )
    }
}
