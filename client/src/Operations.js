import React from 'react'

class Operations extends React.Component {
    constructor(){
        super();
        this.state={
            students:[]
        }
    }  
    componentDidMount(){
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
  render() {
      console.log(this.state.students)
    return (
      <div>
          <h2>Students data</h2>
          {
              this.state.students.map((std)=>(
                  <div key={std.id}>
                      <p>{std.name}</p>
                      <p>{std.address}</p>
                      <p>{std.phonenumber}</p>
                  </div>
              ))
          }
          </div>
    )
  }
}
export default Operations
