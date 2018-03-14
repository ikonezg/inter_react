import React, { Component } from 'react';

class Title extends Component{

    state = {
        color: '000',
        toggle: false,
        title: 'Blazing Edge (zadatak)'
    }

    componentWillMount(){
        this.loadRandomColor();
        console.log(this.state.color);
    }

    loadRandomColor(){
        const randomColorURL = 'http://www.colr.org/json/color/random'; 
        fetch(randomColorURL)
            .then((res)=>{
                if(!res.ok){
                    if(res.status >= 400 && res.status < 500){
                        return res.json().then(data => {
                            let err = {errorMsg: data.message}
                            throw err;
                        })
                    } else {
                        let err={errorMsg: 'Please try again'}
                    }
                    
                }
                console.log(res);
                return res.json();
            }).then(randomColor => this.setState({color: randomColor.new_color, toggle: false}));
    }
    toggleColor = () =>{
        var copyState = {...this.state}; 
        if(copyState.toggle === false){
            copyState.toggle = true;
            copyState.color = '000';
            this.setState({...copyState}); 
        } else {
            this.loadRandomColor(); 
        }
    }

    addTitleHandler =(event)=>{
        var stateCopy = {...this.state}; 
        stateCopy.title = event.target.value;
        this.setState({...stateCopy}); 
    }

    render(){
        return(
            <div>
                <h1 onClick={this.toggleColor}
                 style={{
                    color: `#${this.state.color}`
                }}>{this.state.title}</h1>
            
                <input 
                value={this.state.title}
                onChange={(event) => this.addTitleHandler(event)}
                />
            </div>
        );

    }
}

export default Title; 