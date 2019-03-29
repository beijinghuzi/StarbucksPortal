import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Tag, Tooltip, Button, Pagination, Spin, Message } from 'antd';
import numeral from 'numeral';
import { Link } from 'dva/router';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';
import ActiveChart from 'components/ActiveChart';
import Authorized from '../../utils/Authorized';
import styles from './StoreList.less';
import InfiniteScroll from 'react-infinite-scroller';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

const CheckableTag = Tag.CheckableTag;


const itemSrc = ['images/shoplist/item1.jpg', 'images/shoplist/item2.png', 'images/shoplist/item3.png', 'images/shoplist/item4.png', 'images/shoplist/item3.png'];

const typedate = [
  {
    typecode: "c9bc892c7e38464386df0c31ad71825f",
    typename: "表单",
    bgclass: "card-item layer-bg-red",
    typeicon: "icon iconfont icon-form_light",
    downloads: "2.3k",
    likes: "1.4k",
    tag: "",
    color: "color-gold"
  }, {
    typecode: "65b2292e2354486da347bb82f4f752f8",
    typename: "流程",
    bgclass: "card-item layer-bg-blue",
    typeicon: "icon iconfont icon-procedure",
    downloads: "12k",
    likes: "2.4k",
    tag: "",
    color: "color-gold"
  }, {
    typecode: "abf6c55d0aef420289220cefdad8d091",
    typename: "报表",
    bgclass: "card-item layer-bg-purple",
    typeicon: "icon iconfont icon-chart",
    downloads: "2.3k",
    likes: "1.4k",
    tag: "",
    color: "color-green"
  }, {
    typecode: "d8a418e423c148bdb08a885832202528",
    typename: "模块",
    bgclass: "card-item layer-bg-cyan",
    typeicon: "icon iconfont icon-module",
    downloads: "1.3k",
    likes: "1.1k",
    tag: "",
    color: "color-green"
  }, {
    typecode: "e8f2b24447964bd3a7fe75c78df4bdd6",
    typename: "控件",
    bgclass: "card-item layer-bg-purplish",
    typeicon: "icon iconfont icon-adjust-vt",
    downloads: "2.3k",
    likes: "1.4k",
    tag: "",
    color: "color-red"
  }, {
    typecode: "e3909981d012426bae660b0ed08e4dcc",
    typename: "方法",
    bgclass: "card-item layer-bg-gray",
    typeicon: "icon iconfont icon-library",
    downloads: "2.3k",
    likes: "1.4k",
    tag: "",
    color: "color-blue"
  }, {
    typecode: "b080112a7f8a483d8f2ede9e2cb25463",
    typename: "样式",
    bgclass: "card-item layer-bg-green",
    typeicon: "icon iconfont icon-style",
    downloads: "3.3k",
    likes: "2.4k",
    tag: "",
    color: "color-green"
  }, {
    typecode: "12ad0fe667ea4005b113f5dc3d5c2a7f",
    typename: "知识",
    bgclass: "card-item layer-bg-pink",
    typeicon: "icon iconfont icon-books",
    downloads: "3.3k",
    likes: "2.4k",
    tag: "",
    color: "color-red"
  }
];
const leftMenu = [
  {
    iconCls: 'icon iconfont icon-form_light',
    name: '表单',
  },
  {
    iconCls: 'icon iconfont icon-style',
    name: '样式',
  },
  {
    iconCls: 'icon iconfont icon-procedure',
    name: '流程',
  },
  {
    iconCls: 'icon iconfont icon-chart',
    name: '报表',
  },
  {
    iconCls: 'icon iconfont icon-module',
    name: '模块',
  },
  {
    iconCls: 'icon iconfont icon-adjust-vt',
    name: '控件',
  },
  {
    iconCls: 'icon iconfont icon-library',
    name: '方法',
  },
  {
    iconCls: 'icon iconfont icon-books',
    name: '知识',
  },
];


// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});
@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class StoreList extends PureComponent {
  state = {
    selectedTags: [],
    selectedTags1: [],
    selectedTags2: [],
    TagList: [],
    isMore: false,
    urlParam: '',
    Typecode: '',
    typeList: [],
    StoreList: [],
    total: 10,
    clicktype: 0,
    imgsrc: '<img src="images/user.png" />',
    tagcodes: '',
    isloading: false,
    stitle: 'un',
    tagCodes: 'un',
    isDesigner: false,
    showColor: '',
    hasMoreItems: true,
    stopnum: 0,
    hasNextPage:true,
  };
  GetTpyeByUrl = () => {

    let reg = new RegExp("(^|&)typecode=([^&]*)(&|$)", "i");
    let regstitle = new RegExp("(^|&)stitle=([^&]*)(&|$)", "i");
    let tmpUrl = window.location.hash.replace('store/storelist?', 'store/storelist?level=2&').replace('', '');

    let tmpValue = tmpUrl.match(reg);
    let tmpValuestitle = tmpUrl.match(regstitle);
    let typecode = '';
    if (tmpValue != null) {
      typecode = tmpValue[2];
      this.state.Typecode = typecode;
      this.forceUpdate();

    }
    if (tmpValuestitle != null) {
      this.state.stitle = decodeURIComponent(tmpValuestitle[2]);
      this.forceUpdate();
    }
    if (tmpUrl.indexOf('designer=1') > -1) {
      this.state.isDesigner = true;
      this.forceUpdate();
    }
  }

  GetTagCodes = () => {
    const _me = this;
    let TagCodes = '';
    let taglist = _me.state.selectedTags;
    for (let n = 0; n < taglist.length; n++) {
      if (n == 0) {
        TagCodes = taglist[n].tagCode;
      } else {
        TagCodes = `${TagCodes},${taglist[n].tagCode}`;
      }
    }
    // _me.state.selectedTags=taglist==''?'un':taglist;
    _me.state.tagcodes = TagCodes == '' ? 'un' : TagCodes;
    _me.forceUpdate();
  }

  Getcolor = (code) => {
    let typelist = typedate;
    let strcolor = 'color-gold';
    for (let n = 0; n < typelist.length; n++) {
      if (typelist[n].typecode == code) {
        strcolor = typelist[n].color;
        break;
      }
    }
    this.state.showColor = strcolor;
    this.forceUpdate();
    localStorage.setItem('access_TypeColor', strcolor);
  }
  fetchStoreList = () => {

    const _me = this;
    if( ! _me.state.hasNextPage){
       return false;
    }
    if (_me.state.Typecode == '') {
      return false;
    }
    _me.state.hasMoreItems = false;
    _me.state.stitle = _me.state.stitle.Trim() == '' ? 'un' : _me.state.stitle;
    _me.state.isloading = true;
    _me.state.tagcodes = _me.state.tagcodes == '' ? 'un' : _me.state.tagcodes;
    _me.forceUpdate();

    const fetchParams = {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + window.gettoken

      },
      mode: 'cors'
    };


    var promise = new Promise((resolve, reject) => {

      fetch(window.SEVERURL + '/api/store/item/' + _me.state.Typecode + '/un/' + encodeURIComponent(_me.state.stitle) + '/' + _me.state.tagcodes + '/CN'+'/'+_me.state.stopnum, fetchParams).then(response =>
        response.json(response)).then(function (json) {
          if (typeof json === 'string') {
            json = JSON.parse(json);
          }
          if (json.errcode == '20000') {

            if (json.Data != null & json.Data.length != 0) {
              let slist = _me.state.StoreList;
              json.Data.map((track) => {
                slist.push(track);
              });
              _me.setState({
                StoreList: slist,
                hasMoreItems: true,
                hasNextPage:json.hasNexPage,
                stopnum:_me.state.stopnum+1,
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




  // 回车搜索
  onKeyuphandler = (e) => {
    const _me = this;
    if (e.keyCode === 13) {
      _me.fetchStoreList();
    }
  }
  fetchTagList = () => {

    const _me = this;
    _me.state.urlParam = _me.state.Typecode;
    _me.forceUpdate();
    const fetchParams = {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + window.gettoken
      },
      mode: 'cors'
    };
    var promise = new Promise((resolve, reject) => {

      fetch(window.SEVERURL + '/api/store/tag/' + _me.state.urlParam, fetchParams).then(response =>
        response.json(response)).then(function (json) {

          if (typeof json === 'string') {
            json = JSON.parse(json);
          }
          if (json.errcode == '20000') {
            _me.setState({
              TagList: json.Data,
            })
          } else {
            Message.error(json.errmsg);
          }
        });
    }).catch((error) => {

    })
  };
  fetchTypeList = () => {
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

      fetch(window.SEVERURL + '/api/store/category/CN/1', fetchParams).then(response =>
        response.json(response)).then(function (json) {
          if (typeof json === 'string') {
            json = JSON.parse(json);
          }
          if (json.errcode == '20000') {
            _me.setState({
              typeList: json.Data,
            })
            localStorage.setItem('access_IndexNewTypeList', JSON.stringify(json.Data));
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

    const _me = this;
    _me.props.dispatch({
      type: 'monitor/fetchTags',
    });
    let TypeList = localStorage.getItem('access_IndexNewTpyeList') || '';
    if (TypeList != '') {
      _me.state.typeList = JSON.parse(TypeList);
      _me.forceUpdate();
    } else {
      _me.fetchTypeList();
    }
    _me.GetTpyeByUrl();
    _me.Getcolor(_me.state.Typecode);
    _me.fetchStoreList();
    _me.fetchTagList();
  }
  handClick = (e) => {
    this.setState({
      isMore: !this.state.isMore,
    })
  }
  TypeChange = (i, typecode) => {
    if (!this.state.isDesigner) {
      this.state.clicktype = i;
      this.state.Typecode = typecode;
      this.state.selectedTags = [];
      this.state.StoreList = [];
      this.state.tagcodes = 'un';
      this.state.hasNextPage=true;
      this.state.stopnum=0;
      this.forceUpdate();
      this.fetchStoreList();
      this.fetchTagList();
      this.Getcolor(this.state.Typecode);
      window.location.href = '#/store/storelist?typecode=' + typecode;
    } else {
      Message.warning('类型已锁定！');
    }
  }
  handleChange = (tag, checked) => {

    const { selectedTags } = this.state;
    let tagcode = this.state.tagcodes;
    const nextSelectedTags = checked ?
      [...selectedTags, tag] :
      selectedTags.filter(t => t !== tag);
    for (let j = 0; j < nextSelectedTags.length; j++) {
      if (j == 0) {
        tagcode = nextSelectedTags[j].tagCode;
      } else {
        tagcode += ',' + nextSelectedTags[j].tagCode;
      }
    }
    this.state.selectedTags = nextSelectedTags;
    this.state.tagcodes = tagcode;
  
    this.state.StoreList = [];
    this.state.hasNextPage=true;
     this.state.stopnum=0;
    this.forceUpdate();
    this.GetTagCodes();
    this.fetchStoreList();
  }
  RemoveALLChange = () => {
    this.state.selectedTags = [];
    this.state.StoreList = [];
    this.state.tagcodes = 'un';
    this.state.hasNextPage=true;
     this.state.stopnum=0;
    this.forceUpdate();
    this.fetchStoreList();
  }
  createMarkupbody = (Body) => {
    return {
      __html: Body,
    };
  }
  render() {
    const { monitor, loading } = this.props;
    const { selectedTags, selectedTags1, selectedTags2, typeList, isloading } = this.state;
    const crSwitch = "color-gold"; //  color-gold, color-blue, color-green,, color-red
    let items = [];
    const loader = <div className="loader">Loading ...</div>;
    this.state.StoreList.map((item, i) => {
      items.push(
        <Col key={i} xs={22} sm={12} md={12} lg={8} xl={6} >
          <div className="app-card"  >
            <div className="add-shop"  ><i className="icon iconfont icon-shop-car-fill" /></div>
            <Link  to={item.detailpage + '?itemId=' + item.itemId + '&versionCode=' + item.Version + '&versionId=' + item.Version} >
              <div className="project-cover">
                <div className="card-pic">
                  <div><img src={item.itemsrc|| itemSrc[Math.floor(Math.random() * 4)]} alt="" /></div>
                </div>
              </div>
              <div className="project-details">

                <div className="project-title">{item.name}</div>

                <div className="description">
                  {item.body}
                </div>

                <div className="project-tags">
                  <span>{item.tagNames}</span>
                </div>
                <div className="project-stats">
                  <div>
                    <div className="name">
                      <i className="icon iconfont icon-heart" />
                    </div>
                    <div className="number">{item.links}</div>
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

          </div>
        </Col>
      );
    });
    return (

      <Fragment>
        <div className="bg-whitesmoke" />
        <div className="search-wrap">
          <input type="search" placeholder="在 UBI 中搜索广受好评的模板" onKeyUp={this.onKeyuphandler} onChange={(e) => { this.setState({ stitle: e.target.value }); }} />
        </div>
        <div className={`${'container'} ${this.state.showColor}`}>
          <Row gutter={24} style={{ paddingTop: 6 }} >
            <Col span={2} className='left-menu' >
              <ul className="menu-list">
                <li key={0} className={this.state.Typecode == 'un' ? 'current' : ''} onClick={this.TypeChange.bind(this, 0, 'un')}>
                  <i className={'un'}></i>
                  <div className="name">{'全部'}</div>
                </li>
                {typeList.map((item, i) => (
                  <li key={i} className={item.typecode == this.state.Typecode ? 'current' : ''} onClick={this.TypeChange.bind(this, i, item.typecode)}>
                    <i className={item.typeicon}></i>
                    <div className="name">{item.typename}</div>
                  </li>
                ))}
              </ul>
            </Col>
            <Col span={22} className='content' >
              <div className="tags-collapse" style={{ height: !this.state.isMore ? "100%" : '50px', overflow: 'hidden' }} >
                <div className="tags-row">
                  <div className="title" style={{display:selectedTags.length==0?'none':''}}>已选择:</div>
                  <div className="tags">
                    {selectedTags.map(tag => (
                      <CheckableTag
                        key={tag.tagCode}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={checked => this.handleChange(tag, checked)}

                      >
                        {tag.tagName}
                      </CheckableTag>
                    ))}
                    <CheckableTag
                      style={{ display: selectedTags.length == 0 ? 'none' : '' }}
                      checked={true}
                      onChange={checked => this.RemoveALLChange(this)}
                    >
                      全部清除
                      </CheckableTag>
                  </div>
                  <Button shape="circle" type='primary' className="btn-more" onClick={this.handClick.bind(this)} >
                    <i className="icon iconfont icon-ellipsis" />
                    <h5> {this.state.isMore ? '更多' : '收起'} </h5>
                  </Button>
                </div>
                {this.state.TagList.map((item, i) => (
                  <div className="tags-row" key={i}>
                    <div className="title">{item.GroupName}:</div>
                    <div className="tags">
                      {item.TagList.map((itemtag, k) => (
                        <CheckableTag
                          key={itemtag.tagCode}
                          checked={selectedTags.indexOf(itemtag) > -1}
                          onChange={checked => this.handleChange(itemtag, checked)}
                        >
                          {itemtag.tagName}
                        </CheckableTag>
                      ))}
                    </div>
                  </div>
                ))
                }
              </div>

              <div className="sort-row" >
                <div className="sort-item">
                  <span className="sort-name">最多下载</span>
                  <i className="icon iconfont icon-down" style={{ color: '#EF0909' }} />
                  <i className="icon iconfont icon-up" />
                </div>
                <div className="sort-item">
                  <span className="sort-name">最新发布</span>
                  <i className="icon iconfont icon-down" />
                  <i className="icon iconfont icon-up" />
                </div>
                <div className="sort-item">
                  <span className="sort-name">使用率</span>
                  <i className="icon iconfont icon-down" />
                  <i className="icon iconfont icon-up" />
                </div>
              </div>

              <Row className="app-page" gutter={24} >
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.fetchStoreList}
                  hasMore={this.state.hasMoreItems}
                  loader={loader}>
                
                    {items}
                 
                </InfiniteScroll>

              </Row>

            </Col>
          </Row>
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

      </Fragment>
    );
  }
}
