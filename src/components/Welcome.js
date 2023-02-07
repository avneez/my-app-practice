import React from "react";
function Welcome(props, {age,d}) {
  return (
    <>
      <h6> Hello, {props.role} {props.name} </h6>
      {/* <h6> object hii, {age} {d} </h6> */}
    </>
  );
}


// class Welcome extends React.Component{
//   render(){
//     return(
//     <h6> Hello, {this.props.role} {this.props.name} </h6>);
//   }
// }
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   const element = <Welcome name='Avneez' />
//   root.render(element);

export default Welcome;