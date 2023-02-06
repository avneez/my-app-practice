import React, { Component } from "react";
// export default function Welcome(props) {
//     return (
//     <h6> Hello, {props.role} {props.name} </h6>
//     );
//   }


class Welcome extends React.Component{
  render(){
    const {name = "Avneez", role="SE"} =this.props;
    return(
    <h6> Hello, {role} {name} </h6>);
  }
}
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   const element = <Welcome name='Avneez' />
//   root.render(element);

export default Welcome;