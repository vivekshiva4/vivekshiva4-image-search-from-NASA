import React, { Component} from "react"
import {hot} from "react-hot-loader"
import "./ImageSearchFromNASA.css"

class ImageSearchFromNASA extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div>
                <h1>NASA Image Gallery</h1>
                <div className="searchBar">
                    <div className="form">
                        <input type="search" placeholder="ex: earth, stars" name="search" />
                        <button>Search</button>
                    </div>
                </div>
                <div className="container">
                    <img src="https://picsum.photos/300/200/?random"/>
                </div>
            </div>
        )
    }
}

export default hot(module)(ImageSearchFromNASA)
