export default function Welcome(props) {
    return (
    <h6> Hello, {props.role} {props.name} </h6>
    );
  }

//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   const element = <Welcome name='Avneez' />
//   root.render(element);