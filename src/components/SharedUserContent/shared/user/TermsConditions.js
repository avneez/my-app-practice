import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import appConstant from '../constant/constant.json';

function TermsConditions() {
  useEffect(() => {
    termsAndCondition();
  }, []);
  const props = useParams();
  const [tac, setTac] = React.useState({});
  const params = {
    headers: {
      "Content-Type": 'application/json',
      "Access-Control-Allow-Origin": '*'
    }
  };
  const termsAndCondition = () => {
    axios.get(`${appConstant.API_URL}/bx_block_termsandconditions/system_configurations/1`, params)
        .then(res => {
          console.log(res.data);
          if (res.data.status === 200) {
            setTac(res?.data?.data);
          } else {
          }
        })
        .catch(error => {
        });
  }
  return (
      <>
        <div className='filter-blank'></div>
        <div className='termsAndConditions'>
          <div className='background-color'></div>
          <div className='terms'>
            <h6>Agreement</h6>
            <h4>Terms of Service</h4>
            <div dangerouslySetInnerHTML={{__html: tac.terms_conditions}}></div>
            {/*<div class="button-group mt-5 mb-0">*/}
            {/*  <button class="border-only">NOT RIGHT NOW..</button>*/}
            {/*  <button className='filled-button text-center'>I AGREE WITH TERMS</button>*/}
            {/*</div>*/}
          </div>

        </div>
      </>
  )
}

export default TermsConditions;