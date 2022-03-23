import React from 'react'
import axios from 'axios'

class Operations extends React.Component {
    constructor(){
        super();
        this.state={
            students:[],
            name:"",
            address:"",
            phonenumber:""
        }
    }  
    componentDidMount(){
        this.getData();
    }
    getData=()=>{
        fetch("http://localhost:2000/retreive")
          .then((res)=>{
              return res.json()
          })
          .then((jsonRes)=>{
              this.setState({
                  students:jsonRes
              })
            })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleClick=()=>{
        console.log(this.state.name,this.state.address,this.state.phonenumber)
        const newStudent={
            name:this.state.name,
            address:this.state.address,
            phonenumber:this.state.phonenumber
        }
        axios.post("http://localhost:2000/add",newStudent)
           .then((res)=>{console.log(res);this.getData();})
           .catch((err)=>console.log(err))
        this.setState({
            name:"",address:"",phonenumber:""
        })
    }
  render() {
      //console.log(this.state.students)
    return (
      <div style={{display:"flex",justifyContent:"space-between"}}>
          <div>
          <h2>Students data</h2>
          {
              this.state.students.map((std)=>(
                  <div key={std.id}>
                      <p>name={std.name}</p>
                      <p>address={std.address}</p>
                      <p>phonenumber={std.phonenumber}</p>
                  </div>
              ))
          }
          </div>
          <div>
             <p><input type="text" name="name" placeholder='enter name' value={this.state.name}
              onChange={this.handleChange}/></p>
              <p><input type="text" name="address" placeholder='enter address' value={this.state.address}
              onChange={this.handleChange}/></p>
              <p><input type="text" name="phonenumber" placeholder='enter phone number' value={this.state.phonenumber}
              onChange={this.handleChange}/></p>
              <button onClick={this.handleClick}>Send</button>
          </div>
          </div>
    )
  }
}
export default Operations
