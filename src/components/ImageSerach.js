import React from 'react'

const ImageSerach = () => {



    const Submit = () => {
        // fetchRequest();
        // setImg("");
      };


  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center input">
          <input
            className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
            type="text"
            placeholder="Search"
          />
          <button
            type="submit"
            onClick={Submit}
            className="btn bg-dark text-white fs-3 mx-3"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </>
);
}

export default ImageSerach