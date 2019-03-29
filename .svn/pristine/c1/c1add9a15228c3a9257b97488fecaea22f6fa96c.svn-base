import React, { PureComponent } from 'react';
import { Carousel } from 'antd';
import styles from './DetailScrollImage.less';

export default class DetailScrollImage extends PureComponent {
  state = {
   detailimgs:[],
  };
 
  
  componentDidMount = () => {
  const _me=this;
   _me.state.detailimgs=_me.props.detailimgs || [];
   _me.forceUpdate();
  }

   UpdateimgList=(imgList)=>{
     const _me=this;
     _me.state.detailimgs=imgList|| [];
   _me.forceUpdate();
   
 
 }

  componentWillUnmount() {
    
  }
 
  createMarkupbody = (Body) => {
    return {
      __html: Body,
    };
  }
  
  render() {
 const _me=this;

    return (
     
                  <Carousel className={styles.product} >
                    {_me.state.detailimgs.map((item, k) => (
                      <div className={styles.img_wrap} key={k}><img src={item.src} alt={item.explain} /></div>
                    ))}
                  </Carousel>
              
    );
  }
}
