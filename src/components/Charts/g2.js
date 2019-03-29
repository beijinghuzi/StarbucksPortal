// 全局 G2 设置
import { track, setTheme } from 'bizcharts';

track(false);

const config = {
  defaultColor: '#120E28',
  shape: {
    interval: {
      fillOpacity: 1,
    },
  },
};

setTheme(config);
