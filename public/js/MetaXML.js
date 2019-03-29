//后台请求服务端地址 上海地址http://192.168.0.150:50000
window.SEVERURL = ''; //80, 9061
//window.gettoken='AQAAANCMnd8BFdERjHoAwE_Cl-sBAAAAp3A7C2pXGkG1tqmRGOTwpgAAAAACAAAAAAAQZgAAAAEAACAAAABNaIyBGQ9OUuVhkdcIPDqafmS4R-7asV3wGRUwzaD8IAAAAAAOgAAAAAIAACAAAACdBBLEPfZutQkd0-tvVldm2KakwZUWX-yACWJCilb9_qAAAACAFyWhK81ep4_XrY2kvkIq6lSerb6qqwvLAmrl0_mc6gquNuuC7s5sFQfeu2yPiv9BYW3pHEp8ISt0dujlVlXUrETjdCAXIHOBG7tgZeeO2mWaXHfuFXw_CnOCCcge-ApUha9ZC8PYKGOvMzlHuVbmDRI2ygABd5MOzU7GvCfHPpfq0B7vGyDqmm9cHF1lkfuxAXXHIqZQKRF-rcclEDR_QAAAABHrUY72Jw_L9VgOCXfeA9TbTEAyXKMG7iFHYjrVUwgvp0XgEl31iHnVBAXU_pkDrU2eP7hmxJHfh3r4YFHxXQ0';
window.gettoken='AQAAANCMnd8BFdERjHoAwE_Cl-sBAAAANJnYQzuKlUSmsTRlZ_T4cgAAAAACAAAAAAADZgAAwAAAABAAAABopX908fAX-hlX6cXRouIrAAAAAASAAACgAAAAEAAAAJtT1DlRYprRx-u4EQtVJnCQAAAA91bBryZZPeqFwebUThxvaiCS0SBNAqUD8xBS7eKlt_wtX0KQV56_WqxWUUFhApuVQqsyVRmuXrc2kEdQuSL1qDgQSPeTJvjUeVkSk8_vjOgiywqEh91tB09_w1X7WvCk-AwA8zCAhF7N6fp1RUn-G_oV7avql4EPGppb-o00mfBvtsrg8sMzA4wMXi2XV7nxFAAAANTHl_IQsiQt7n4U0NNbOSKl9EnM';

window.AuthorizationOptions = {
      method: 'get',
      headers: {
        'Authorization':'Bearer '+ window.gettoken,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    };
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function NewGuid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//去除字符串中间空格 
String.prototype.Trim = function () {
    //return this.replace(/(^s*)|(s*$)/g, "");
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
}
//去除字符串左侧空格 
String.prototype.LTrim = function () {
    return this.replace(/(^s*)/g, "");
}
//去除字符串右侧空格 
String.prototype.RTrim = function () {
    return this.replace(/(s*$)/g, "");
}