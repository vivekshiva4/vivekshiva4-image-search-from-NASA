import React, { Component} from "react"
import {hot} from "react-hot-loader"
import "../css/ImageSearchFromNASA.css"
const axios = require('axios');

class ImageSearchFromNASA extends React.Component{
    constructor(props){
        super(props)
        const displayName = 'Solar System'
        this.state = {
            errorMessage: null,
            searchInput : displayName,
            imageUrlFromNasa: {},
            loading: false
        }
        this._getImagesFromNasa = this._getImagesFromNasa.bind(this)
        this._onChange = this._onChange.bind(this)
        this._enterPressed = this._enterPressed.bind(this)
    }

    componentDidMount() {
        this._getImagesFromNasa()
    }

    _onChange(event) {
        this.setState({searchInput: event.target.value})
    }

    _enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) {
            //13 is the enter keyCode
            this._getImagesFromNasa()
        }
    }

    //Function to retrieve data from nasa api (get) request.
    _getImagesFromNasa(searchInput) {
        searchInput = this.state.searchInput;

        //clearing the state data for preventing the image flickering
        this.setState({
            loading: true,
            imageUrlFromNasa:{},
            searchInput: "",
        });

        axios.get('https://images-api.nasa.gov/search?q='+ searchInput)
            .then((response) => {
                // handle success
                if(response.status === 200){
                    let result = response.data.collection.items
                    if(result.length > 0){
                        this.setState({
                            imageUrlFromNasa: result,
                            loading: false
                        })
                    }else{
                        this.setState({
                            loading: false,
                            errorMessage: "Based on your selections, no results were found."
                        })
                    }
                }
            }).catch((error) =>{
                // handle error
                if(error.response.status === 400) {
                    this.setState({
                        loading: false,
                        errorMessage: "The request was unacceptable, often due to missing a required parameter"
                    })
                }else if(error.response.status === 404) {
                    this.setState({
                        loading: false,
                        errorMessage: "The requested resource doesn’t exist"
                    })
                }else if(error.response.status === 500 || error.response.status === 502 || error.response.status === 503 || error.response.status === 504 ) {
                    this.setState({
                        loading: false,
                        errorMessage: "Something went wrong on the API’s end"
                    })
                }
        })
    }
    render(){
        let state = this.state
        return(
            <div>
                <h1>NASA Image Gallery</h1>
                <div className="searchBar">
                    <div className="form">
                        <input type="search" placeholder="ex: earth, stars" name="searchInput" ref="searchInput" value={state.searchInput} onChange={this._onChange} onKeyDown={this._enterPressed} />
                        <button onClick={this._getImagesFromNasa}>Search</button>
                    </div>
                </div>

                {/*loader*/}
                { state.loading && <img  src="https://cdn.dribbble.com/users/3337757/screenshots/6825268/076_-loading_animated_dribbble_copy.gif" /> }

                <div className="container">
                    {function () {
                        if (state.imageUrlFromNasa.length > 0 ) {
                            let count = 0
                            return (
                                state.imageUrlFromNasa.map(event => {
                                    count = count + 1
                                    const uid = "row_" + count
                                    if(event.links && event.links[0].rel === "preview"){
                                        return (
                                            <img key={uid} src={event.links[0].href}/>
                                        )
                                    }
                                })
                            )
                        }else {
                            return (
                                <div>
                                    <h1>{state.errorMessage}</h1>
                                </div>
                            )
                        }
                    }()}
                </div>
            </div>
        )
    }
}

export default hot(module)(ImageSearchFromNASA)
