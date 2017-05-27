
interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'qqLoc', src: 'https://apis.map.qq.com/tools/geolocation/min?key=EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ&referer=yujian' },
  { name: 'qqMap', src: 'http://map.qq.com/api/js?v=2.exp&key=EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ' },
  { name: 'wxJSSDK', src: 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js' }
];