import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Button, Tooltip, Tabs, Rate, Popover, Spin, Message, Modal, Progress } from 'antd';
// import {UnControlled as CodeMirror} from 'react-codemirror2'
import { DetailScrollImage } from 'components/Store';
import styles from './Detail.less';


const TabPane = Tabs.TabPane;

const code = 'const a = 0;';

const itemSrc = ['images/shoplist/item1.jpg', 'images/shoplist/item2.png', 'images/shoplist/item3.png', 'images/shoplist/item4.png', 'images/shoplist/item3.png'];
const storeList = [{}, {}, {}, {}];

@connect(({ project, activities, chart, loading }) => ({
  project,
  activities,
  chart,
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))
export default class Detail extends PureComponent {
  state = {
    itemId: '',
    versionCode: '',
    iteminfo: [],
    detailimgs: [{}],
    properties: [],
    Comments: [],
    bestCriticism: [],
    course: [],
    related: [],
    isloading: false,
    versionId: '',
    showColor: '',
    showpreview: false,
    Messagevisible: false,
  };
  GetTpyeByUrl = () => {

    let reg = new RegExp("(^|&)itemId=([^&]*)(&|$)", "i");
    let regvc = new RegExp("(^|&)versionCode=([^&]*)(&|$)", "i");
    let regid = new RegExp("(^|&)versionId=([^&]*)(&|$)", "i");
    let tmpUrl = window.location.hash.replace('store/Detail?', '/store/Detail?level=2&').replace('', '');
    let tmpValue = tmpUrl.match(reg);
    let tmpValuevc = tmpUrl.match(regvc);
    let tmpValueid = tmpUrl.match(regid);
    if (tmpValue != null) {
      this.state.itemId = tmpValue[2];
    }
    if (tmpValuevc != null) {
      this.state.versionCode = tmpValuevc[2];
    } if (tmpValueid != null) {
      this.state.versionId = tmpValueid[2];
    }

    this.forceUpdate();
  }
  fetchDetail = () => {
    const _me = this;
    const fetchParams = {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + window.gettoken
      },
      mode: 'cors'
    };
    _me.state.isloading = true;
    _me.forceUpdate();
    var promise = new Promise((resolve, reject) => {

      fetch(window.SEVERURL + '/api/store/itemdtl/' + _me.state.itemId + '/' + _me.state.versionCode + '/CN', fetchParams).then(response =>
        response.json(response)).then(function (json) {
          if (typeof json === 'string') {
            json = JSON.parse(json);
          }
          if (json.errcode == '20000') {
            _me.setState({
              iteminfo: json.Data.iteminfo,
              detailimgs: json.Data.detailimgs || [],
              Comments: json.Data.Comments || [],
              bestCriticism: json.Data.bestCriticism || [],
              course: json.Data.course || [],
              related: json.Data.related || [],
              properties: json.Data.properties || []
            })
            _me.refs.UpdateImgList.UpdateimgList(_me.state.detailimgs);
            if (json.Data.iteminfo.previewUrl != '') {
              _me.setState({
                showpreview: true,
              })
            }

          } else {
            Message.error(json.errmsg);
          }
          _me.setState({
            isloading: false,
          })
        });
    }).catch((error) => {
      _me.setState({
        isloading: false,
      })
    })
  };
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
    this.state.showColor = localStorage.getItem('access_TypeColor') || 'color-gold';
    this.forceUpdate();
    this.GetTpyeByUrl();
    this.fetchDetail();
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }
  handleBack = () => {
    window.history.go(-1);
  }
  handledownload = () => {
    let data = {
      src: 'ubistore',
      itemId: this.state.itemId,
      versionId: this.state.versionId
    };
    if (window.opener != null) {
      window.opener.postMessage(JSON.stringify(data), '*');
      Message.success('安装成功');
      setTimeout(() => {
        window.opener = null;
        window.open('', '_self');
        window.close();
      }, 2000);
    }

  }
  createMarkupbody = (Body) => {
    return {
      __html: Body,
    };
  }
  hideModal = () => {
    this.setState({
      Messagevisible: !this.state.Messagevisible,
    });
  }
  openUrl = () => {

    window.open(this.state.iteminfo.previewUrl, '_balnk');
  }
  GetVersionExplainHtml = (n, item) => {
    if (item.propCode == 'UpdateDescr') {
      return <li key={n} ><strong>{item.propName}:  </strong> <div dangerouslySetInnerHTML={this.createMarkupbody(item.propValue)}></div></li>
    } else {
      return <li key={n} ><strong>{item.propName}:  </strong>{item.propValue}</li>
    }

  }
  render() {
    const crSwitch = "color-gold";
    const _me = this;
    // @blue: #0689b7;
    // @red: #eb5f00;
    // @cyan: cyan;
    // @green: #00d573;
    // @tomato: tomato;
    // @sky: skyblue;
    // @thistle: thistle;

    return (
      <div className={styles.container} >

        <div className={_me.state.showColor} style={{ background: 'white' }}  >
          <Spin spinning={_me.state.isloading} >
            <div className="btn-back">
              <Button shape="circle" size="large" onClick={_me.handleBack} ><i className="icon iconfont icon-arrowleft" /></Button>
            </div>
              <section className={styles.main}>

              <Row gutter={24} style={{ paddingTop: 40 }} justify="center">
                <Col sm={22} md={14} lg={14} offset={1} >
                  <DetailScrollImage detailimgs={this.state.detailimgs}   ref="UpdateImgList" />
                </Col>
                <Col sm={22} md={8} lg={8} className={styles.right_panel} >
                  <div className={styles.prd_title} >
                    {_me.state.iteminfo.title}
                  </div>
                  <div className={styles.news}>
                    <div dangerouslySetInnerHTML={_me.createMarkupbody(_me.state.iteminfo.body)}></div>
                  </div>
                  <section className={styles.info} >
                    <ul>
                      <li className={styles.item}>
                        <span className={styles.name}>类别:</span>
                        <span className={styles.values}>{_me.state.iteminfo.ctgName}</span>
                      </li>
                      <li className={styles.item}>
                        <span className={styles.name}>更新时间:</span>
                        <span className={styles.values}>{_me.state.iteminfo.crtdat}</span>
                      </li>

                      <li className={styles.item}>
                        <span className={styles.name}>开发者:</span>
                        <span className={styles.values}>{_me.state.iteminfo.auther}</span>
                      </li>
                      <li className={styles.item}>
                        <span className={styles.name}>版本号:</span>
                        <span className={styles.values}>{_me.state.iteminfo.versionCode}</span>
                      </li>
                      <li className={styles.item}>
                        <span className={styles.name}>下载量:</span>
                        <span className={styles.values}>{_me.state.iteminfo.downloads}</span>
                      </li>
                      <li className={styles.item}>
                        <span className={styles.name}>访问量:</span>
                        <span className={styles.values}>{_me.state.iteminfo.traffic}</span>
                      </li>
                    </ul>

                  </section>
                </Col>
                <Col sm={22} md={14} lg={14} offset={9} >
                  <div className="bg-card-block">
                    <div className={styles.card_info}>
                      <div className={styles.btn_shop_group}>
                         <Button style={{display: _me.state.showpreview? '':'none'}}  onClick={_me.openUrl}><i className="icon iconfont icon-scan" /></Button>
                        <Button onClick={_me.hideModal}><i className="icon iconfont icon-action1" /></Button>
                        <Button><i className="icon iconfont icon-shopping-cart" /></Button>
                        <Button onClick={_me.handledownload}><i className="icon iconfont icon-clouddownloado" /></Button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
            <section className={styles.details}>
              <Row justify="center" >
                <Col span={22} offset={1} >
                  <Tabs>
                    <TabPane tab="应用描述" key="1" className={styles.app_guide} >


                      <h2 className={styles.title}>属性</h2>
                      <div className={styles.details}>
                        <ul>
                          {_me.state.properties.map((item, n) =>
                            _me.GetVersionExplainHtml(n, item)
                          )}
                        </ul>
                      </div>
                      <h2 className={styles.title}>培训视频</h2>
                      <div className={styles.details}>
                        <video id="" width="100%" height="100%" poster={''} controls="controls" autoPlay="" data-init="1" >
                          <source src={`http://greatyucom.oicp.net:23050/store/video/1.mp4`} data-label="88 KB/秒" type="video/mp4" />

                        </video>
                      </div>
                    </TabPane>
                    <TabPane tab="版本信息" key="2" className={styles.app_info}>
                      <Row>
                        <Col span={24} >
                          <div className={styles.version}>
                            <div className={styles.vername}> 20180703018 Stable</div>
                            <div className={styles.verdtl}>
                              <ul>
                                <li>1、支持了 WebP 格式图片</li>
                                <li>2、修复了不停点击发送语音消息按钮，录音界面不消失问题</li>
                                <li>3、优化了修改 isShowNotificationNumber 属性后刷新 UI</li>
                                <li>4、支持了小视频服务，可在融云官网下载小视频 SDK 进行集成</li>
                              </ul>
                            </div>
                            <div className={styles.vername}>20180703017 Stable</div>
                            <div className={styles.verdtl}>
                              <ul>
                                <li>1、优化了 SDK 连接和重连的逻辑</li>
                                <li>2、会话列表支持了 addHearderView</li>
                                <li>3、支持了 WebP 格式图片</li>
                                <li>4、修复了 Android 8.0 上 AutoLinkTextView 相关的 BUG 问题</li>
                                <li>5、更新了红包 SDK</li>
                                <li>6、支持了小视频服务，可在融云官网下载小视频 SDK 进行集成</li>
                              </ul>
                            </div>

                          </div>
                        </Col>

                      </Row>
                    </TabPane>
                    <TabPane tab="配套使用" key="3" className={styles.app_guide} >
                      {
                        storeList.map((item, i) => (
                          <div className="app-card-wrap" >
                            <div className="app-card"  >
                              <div className="add-shop"><i className="icon iconfont icon-shop-car-fill" /></div>
                              <Link to={"#"} >
                                <div className="project-cover">
                                  <div className="card-pic">
                                    <div><img src={itemSrc[i]} alt="" /></div>
                                  </div>
                                </div>
                                <div className="project-details">

                                  <div className="project-title">合同申请</div>

                                  <div className="description">
                                    合同申请用于 采购、销售、框架协议等
                                    </div>

                                  <div className="project-tags">
                                    <span>标签-流程,流程,</span>
                                  </div>
                                  <div className="project-stats">
                                    <div>
                                      <div className="name">
                                        <i className="icon iconfont icon-heart" />
                                      </div>
                                      <div className="number">999+</div>
                                    </div>
                                    <div>
                                      <div className="name">
                                        <i className="icon iconfont icon-clouddownload" />
                                      </div>
                                      <div className="number">2k+</div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div className="app-plus" style={{ display: i === storeList.length - 1 ? "none" : 'inline-block' }}  >
                              <i className="iconfont icon-plus" />
                            </div>
                          </div>
                        ))
                      }
                    </TabPane>
                    <TabPane tab="用户评论" key="4">
                      <div className={styles.btn_review}>
                        <Button type="primary">添加评价</Button>
                      </div>
                      <div className="ms-grid row" style={{ width: '98%' }} >
                        <div className="user-image col">
                          <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="" />
                        </div>
                        <div className="ms-container col">
                          <div className="ms-header row">
                            <div className="col">
                              <div className="user-name" >Tamás Kézdi</div>
                            </div>
                            <div className="col">
                              <div className="ms-rate" >
                                <Rate defaultValue={5} />
                              </div>
                            </div>
                            <div className="col f-r">
                              <Popover
                                content={<a onClick={_me.hide}>Close</a>}
                                trigger="click"
                              // visible={_me.state.visible}
                              // onVisibleChange={_me.handleVisibleChange}
                              >
                                <span><i className="icon iconfont icon-infocirlceo" style={{ fontSize: 24 }} /></span>
                              </Popover>
                            </div>
                          </div>
                          <div className="ms-time row">2018-06-10</div>
                          <div className="ms-content row">
                            Updated to 7.18.214.2 and now every time I load my solution I get this in a popup window:

                            The 'VSPackage' package did not load correctly.

                          </div>
                          <div className="reply-content ms-grid row">
                            <div className="user-image col"><img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="" /></div>
                            <div className="ms-container col">
                              <div className="ms-header row">
                                <div className="user-name">fetchNotice</div>
                              </div>
                              <div className="ms-time">2018-06-11</div>
                              <div className="ms-content row">
                                The problem may have been caused by configuring change or by the installation of another extension. Blah, blah, nothing really useful.

                                Updated to 7.19.411.1 and the problem still persists.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            </section>
          </Spin>
          <Modal
            title="播放视频"
            visible={_me.state.Messagevisible}
            onOk={_me.hideModal}
            onCancel={_me.hideModal}
            okText="确认"
            cancelText="取消"
            width="70%"
            footer={null}
          >
            <video id="" width="100%" height="100%" poster={''} controls="controls" autoPlay="" data-init="1" >
              <source src={`http://greatyucom.oicp.net:23050/store/video/2.mp4`} data-label="88 KB/秒" type="video/mp4" />
            </video>
          </Modal>
        </div>
        <div className="right-toobar-panel">
          <Tooltip placement="left" title="客服">
            <div className="my-services"><i className="iconfont icon-smile-o" /></div>
          </Tooltip>

          <Tooltip placement="left" title="已选应用">
            <i className="iconfont icon-shop-car-fill" />
            <div className="my-shop-label">应用坊</div>
          </Tooltip>
        </div>

      </div>
    );
  }
}
