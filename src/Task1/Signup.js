import React, { Component } from 'react'
import "./assets/css/main.css"
import "./assets/css/bootstrap.min.css"
import image from './image.png'
import axios from 'axios'
import { Link } from 'react-router-dom';


export class signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
          first_name: '',
          last_name: '',
          email: '',
          schools: [],
          school:'',
          classes: [],
          class:[],
          password: '',
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.getclasses = this.getclasses.bind(this);
      }
    
    handleChange = (e) => {    
    this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler(e){
        e.preventDefault();
        var user  = {
            firstName:this.state.first_name,
            lastName:this.state.last_name,
            email:this.state.email,
            password:this.state.password,
            school:this.state.school,
            class:this.state.class,
         };
        axios.post('https://react-task-api.herokuapp.com/api/users/signup',user).then(response => {
            console.log(response)   
            //alert('sign up')   
            localStorage.setItem('Email',`${user.email}`);  
            localStorage.setItem('Password',`${user.password}`);  
        }).catch(error => {
            console.log(error)
            //alert('error')    
        })
    }
    componentDidMount() {
        axios.get(`https://react-task-api.herokuapp.com/api/schools`)
          .then(res => {
            this.setState({ schools: res.data })
          })
    }
    getclasses(){    
        axios.get(`https://react-task-api.herokuapp.com/api/classes/${this.state.school}/`)
        .then(response => {
          this.setState({ classes: response.data })
        })
    }
    
    render() {
        const { first_name, last_name, email, schools, classes, password } = this.state
        return (
            <div>
                  <form onSubmit={this.submitHandler}>
                  <div className="container rounded bg-white mt-5 mb-5">
                  <div className="row">
                    <div className="col-md-5">
                    <div className="p-3 py-2">
                    <div className="row mt-2"> 
                    <div className="col-md-3" style={Yellow}>
                            Signup
                            </div>   
                    <div className="col-md-3" >
                    <Link to='/signin' className="link" >Sign in</Link>
                    </div> 
                    <div className="col-md-6">
                           
                    </div>  
                          <div className="col-md-6">
                            <label className="labels">First name</label>
                            <input
                              type="text"
                              className="form-control Inputs"
                              name="first_name"
                              value={first_name}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="labels">Last Name</label>
                            <input
                              type="text"
                              className="form-control Inputs"
                              name="last_name"
                              value={last_name}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                        <div className="col-md-12">
                            <label className="labels">Email</label>
                            <input
                              type="text"
                              className="form-control Inputs"
                              name="email"
                              value={email}
                              onChange={this.handleChange}
                            />
                          </div>
                            </div>
                            <div className="row">
                        <div className="col-md-12">
                            <label className="labels">School</label>
                            <select onChange={(s) => { this.setState({ school: s.target.value}, () => { this.getclasses() }) }} class="form-select" id="inputGroupSelect02">
                                    <option></option>
                                        {schools.length ? schools.map(school => <option key={school._id} value={school._id}> {school.name}</option>) : null}
                                    </select>
                          </div>
                            </div>
                            <div className="row">
                        <div className="col-md-12">
                            <label className="labels">Classes</label>
                            <select onChange={(s) => { this.setState({ class: s.target.value}, () => { console.log(s.target.value) }) }} class="form-select" id="inputGroupSelect02">
                                        <option></option>
                                        {classes.length ? classes.map(c => <option key={c._id} value={c._id}> {c.name}</option>) : null}
                                    </select>
                          </div>
                            </div>
                            <div className="row">
                        <div className="col-md-12">
                            <label className="labels">Password</label>
                            <input
                              type="password"
                              className="form-control Inputs"
                              name="password"
                              value={password}
                              onChange={this.handleChange}
                            />
                          </div>
                            </div>
                            <button style={PurpleButton}
                        onClick={this.handleEditProfile}
                          className="btn btn-primary profile-button"
                          type="submit">Sign up</button>
                      </div>
                    </div>
                    <div className="col-md-7">
                                <img src={image} alt="" height={500} width={500} />
                            </div>
                  </div>
                </div>
            </form>
            <div>
    </div>
 </div>
        )
    }
}

export default signup
const PurpleButton = {
    display: 'flex',
    height: ' 44px',
    width: '100%',
    borderRadius: '18px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#463C74',
    margin: '15px 5px'
  };
  const Yellow = {
    borderRadius: '18px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#FFC735',
    color: 'white',
  };
  