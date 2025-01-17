import React, {useEffect, useState} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import axios from 'axios';
import appConstant from '../../shared/constant/constant.json';
import Moment from 'moment';
import LoadingSpinner from '../../shared/Loader';
import { Chart } from "react-google-charts";

function Dashboard() {
  const [dashboardData, setDashboardData] = React.useState({});
  let [notifications, setNotifications] = useState([]);
  let [isNotificationLoading, setIsNotificationLoading] = useState(false);
  let [graphData, setGraphData] = useState([  ['Duration', 'Amount'],['01-01-2023', 0],['01-02-2023', 0], ['01-03-2023', 0], ['01-04-2023', 0]
  , ['01-05-2023', 0], ['01-06-2023', 0], ['01-07-2023', '42,777.00'], ['01-08-2023', '106,567.00']
  , ['01-09-2023', '141,315.00']]);
  let [isGraphLoading, setIsGraphLoading] = useState(true);
  const [inputValues, setInputValue] = useState({
    type: "this_month",
  });


  useEffect(() => {
    dashboardPage();
    getNotifications();
    getGraph();
  }, []);
 
  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue({ ...inputValues, [name]: value });
    getGraph(value);
  }
  const formatCurrency = (value) => {
    return Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace(/^(\D+)/, '');
  };
  const params = {
    headers: {
      "Content-Type": 'application/json',
      "Access-Control-Allow-Origin": '*',
      "token": localStorage.getItem('token')
    }
  };
  const dashboardPage = () => {
    axios.get(`${appConstant.API_URL}/dashboard/dashboards`, params)
        .then(res => {
          if (res.data.status === 200) {
            setDashboardData(res?.data);
          } else {
          }
        })
        .catch(error => {
        });
  }
  const getNotifications = () => {
    setIsNotificationLoading(true);
    axios.get(`${appConstant.API_URL}/notifications/notifications?page=1&limit=5`, params)
        .then(res => {
          setIsNotificationLoading(false);
          if (res?.data?.status === 200) {
            setNotifications(res?.data?.data);
          }else {
            setNotifications([]);
          }
        })
        .catch(error => {
          setIsNotificationLoading(false);
        });
  }

 
  const getGraph = (type = 'this_month') => {
    setIsGraphLoading(true);
    axios.get(`${appConstant.API_URL}/bx_block_dashboard/dashboard_graph?type=${type}`, params)
        .then(res => {
          setIsGraphLoading(false);
          if (res?.data?.status === 200) {
            const result = Object.keys(res.data.range).map((key) => [(key), res.data.range[key]]);
            let data = [];
            data.push(['Duration', 'Amount'])
            for(let i=0; i<result.length; i++){
              let res = result[i];
            if(type==="this_week" || type === "all"){
              console.log(data,"data")
             const  currentdate = `${result[i][0]} ${Moment().year()}`
              res[0] = Moment(currentdate).format("YYYY-MM-DD")
            }else{
              res[0] = Moment((result[i])[0]).format("YYYY-MM-DD")
            }
              res[1] = (res[1] > 0) ? Number(res[1]): 0.00;
                // console.log(res[1].toString(),"res res res res er")
              data.push(res);
            }
           
            setGraphData(data);
          }else {
            
            const data = [
              ["Duration", "Amount"]
          ]
            setGraphData(data);
          }
        })
        .catch(error => {
          setIsGraphLoading(false);
        });

       
  }

  const options = {
    chart: {
      title: 'Sales and Expenses',
    },
    vAxis: {
      viewWindow: {
        min: 0, // Force the y-axis minimum to be zero
      },
    },
  };
 
  return (
    <>
    <Header/>
    <div className='blank'></div>
      <div className='container py-4'>
        <div className='row'>
          <div className='col-md-3'>
            <Sidebar id="1"/>
          </div>
          <div className='col-md-9'>
            <div className='rightSide dashboard'>
              <div className='breadcrumbs'>
                  <span className='active-page'>Dashboard</span>
              </div>
              <div className='row mt-3'>
                <div className='col-lg-7 mb-2'>
                  <div className='row'>
                    <div className='col-sm-6 mb-2'>
                      <div className='revenue border'>
                        <img src="/images/piechart.png" alt="chart" />
                        <div className='title'>Total Revenue</div>
                        <div className='amount'>
                         {formatCurrency(dashboardData?.total_revenue)}
                          <span className='currency'>(SAR)</span>
                        </div>
                        <div className='duration'>Start date : {Moment(dashboardData?.start_date).format('DD-MM-YYYY')}</div>
                        <div className='title'>Monthly average: {formatCurrency(dashboardData?.monthly_avg)}</div>
                      </div>
                    </div>
                    <div className='col-sm-6 mb-2'>
                      <div className='border equipment_details'>
                        <img src="/images/mini-tractor.png" alt="icon" />
                        <div className='title'>Equipment</div>
                        <div className='number'>{dashboardData?.total_equipments}</div>
                        <div className='details'>Last updated on : {Moment(dashboardData?.last_updated_equipment_date).format('DD-MM-YYYY')}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-5 mb-2'>
                  <div className='border p-0'>
                    {isNotificationLoading ? <LoadingSpinner/> :
                        <>
                          {notifications?.length > 0 && notifications?.map((result, i) =>
                              <>
                                <div className={!result?.attributes?.is_read ? 'buyer unread' : 'buyer'}>
                                  <div className='d-flex justify-content-start align-items-start'>
                                    <div className='profile-box'>
                                      <img src={result?.attributes?.image ? result?.attributes?.image : '/images/userr.png'} className='profile' alt="profile"/>
                                      {!result?.attributes?.is_read && <span className='green-dot'></span>}
                                    </div>
                                    <div className='buyer_details w-100'>
                                      <div className='d-flex justify-content-between'><span className='buyer-name' style={{textTransform: 'capitalize'}}>{result?.attributes?.full_name}</span>
                                        <span className='gray-text text-end'>{Moment(result?.attributes?.created_at).startOf('minutes').fromNow()}</span></div>
                                      <div className='order'>
                                        {result?.attributes?.contents}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                          )}
                        </>
                    }
                  </div>
                </div>
              </div>
              <div className='graph'>
              <div className='d-flex justify-content-between equipment_details mb-4'>
                <div className='title'>Revenue</div>
                <select name="type" className='select' value={inputValues.type} onChange={(e) => handleChange(e)} data-testid="select-option">
                  <option value="all">All</option>
                  <option value="this_year">This Year</option>
                  <option value="this_month">This Month</option>
                  <option value="this_week">This Week</option>
                </select>
                </div>
                {isGraphLoading ? <LoadingSpinner/> :
                <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={graphData}
                    options={options}
                />
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;
