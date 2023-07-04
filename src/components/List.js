function List(props) {
    const numbers = [1, 2, 3, "437y8734", [1, 2, 3]];
    const listItems = numbers.map((item,index) => {
        // console.log(item);
        return (<li key={index}>{item+''}</li>)
    })

    return (<>
        <h3 >Original Array : {numbers+''} </h3>
        <h3>List Items : </h3>
        <ul>{listItems}</ul>
    </>);
}
export default List