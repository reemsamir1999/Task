import React, { Component } from 'react'
import axios from 'axios';

export class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
          Token:'',
          user:[]
        }
        this.parseJwt = this.parseJwt.bind(this);
      }

    parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        //alert(JSON.stringify(JSON.parse(jsonPayload)));
        console.log(JSON.stringify(JSON.parse(jsonPayload)))
        var user = JSON.stringify(JSON.parse(jsonPayload))
        this.setState({ user: JSON.stringify(JSON.parse(jsonPayload)) })
        return <h1>${user}</h1>;      
    }
      
    componentDidMount() {
        var user  = {
            email: localStorage.getItem('Email'),
            password: localStorage.getItem('Password'),
         };
        axios.post('https://react-task-api.herokuapp.com/api/users/signin',user).then(response => {
            console.log(response)    
            //alert('Logged in') 
            //alert(response.data)    
            this.setState({ Token: response.data },()=> {this.parseJwt(this.state.Token)});
        }).catch(error => {
            console.log(error)
            //alert('error')    
        })
    }
   
    

    render() {
        return (
            <div>
                <div>{this.state.user}</div>
            </div>
        )
    }
}

export default Signin
