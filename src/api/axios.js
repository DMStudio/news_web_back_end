/**
 * Created by admin-pc on 2017/8/21.
 */
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL='http://118.89.37.216/api/';

export default {
  post(url,data){
    return axios({
      method:'post',
      url:url,
      data:qs.stringify(data),
      headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'
      }
    })
  },
  get(url,params){
    return axios({
      method:'get',
      url:url,
      params,
      header:{
        'X-Requested-With':'XMLHttpRequest'
      }
    }).then(console.log('111'))
  }
}
