import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Spin
} from 'antd';
import {Link} from 'dva/router';
import fetch from 'dva/fetch';
import styles from './Home.less';

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const Yuan = ({ children }) => (
  <span dangerouslySetInnerHTML={{ __html: yuan(children) }} /> /* eslint-disable-line react/no-danger */
);

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Home extends Component {
  state = {
     FirstTypeList:[],
     ing:false,
     stitle:''
  };
     // 回车搜索
  onKeyuphandler = (e) => {
    const _me = this;

    if (e.keyCode === 13 ) {
      if (_me.state.stitle.Trim()!='') {
          window.location.href = '#/store/storelist?typecode=un&stitle='+_me.state.stitle;
      }
    }
  }
 fetchFirstTypeList = () => {
  const _me=this;
     const fetchParams = {
      method: 'get',
      headers: {
        'Authorization':'Bearer '+ window.gettoken
       
      },
       mode: 'cors'
    };
     
     _me.state.isloading=true;
     _me.forceUpdate();
     var promise = new Promise((resolve, reject) =>{

         fetch(window.SEVERURL+'/api/store/category/CN/1', fetchParams).then(response =>
         response.json(response)).then(function(json) {
           
           if (typeof json === 'string') {
            json = JSON.parse(json);
          }
          if(json.errcode=='20000') {
            _me.setState({
              FirstTypeList: json.Data,
              })
             localStorage.setItem('access_IndexNewTpyeList',JSON.stringify(json.Data));
          }
          _me.setState({
              isloading: false,
              })
         });
        }).catch((error)=>{
           _me.setState({
              isloading: false,
              })  
       })
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
 
   this.fetchFirstTypeList();

  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
     
  }


  render() {

    return (
      <Fragment>
        <div className={styles.bg_layer} />
        
        <div className="wrapper">
          <div className="logo" />
          <div className="search-block">
            <input type="search" className="input-search" placeholder="最热门，广受好评的模板应用"  onKeyUp={this.onKeyuphandler} onChange={(e) => { this.setState({ stitle: e.target.value }); }} />
            <i type="search" className="icon iconfont icon-search" />
          </div>
          <div className="ubi-des">
            迅捷，灵活，可视化，集团化的BPM平台产品。
          </div>
        </div>
        <div className="bg-ellipse" />
        <Row gutter={24} className={styles.content}>
          {this.state.FirstTypeList.map((item, i) => (
          <Col className="card-layer" span={6}  key={i} >
            <Link to={"/store/storelist?typecode="+item.typecode}>
              <div className={item.bgclass}>
                <div className="icon-wrap">
                  <i className={item.typeicon} />
                </div>
                <div className="title">{item.typename}</div>
                <div className="detail">

                </div>
                <div className="card-footer">
                  <div>
                    <div className="name">
                      <i className="icon iconfont icon-heart" />
                    </div>
                    <div className="number">{item.likes}</div>
                  </div>
                  <div>
                    <div className="name">
                      <i className="icon iconfont icon-clouddownload" />
                    </div>
                    <div className="number">{item.downloads}</div>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
                        ))
                      }
       
        </Row>

      </Fragment>
    );
  }
}
