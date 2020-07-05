
import { Constants } from '../config';

const CommonUtil = {
  isSuccess(data = {}) {
    const code = typeof data === 'string' ? data : data.code;
    return code != null ? code === Constants.SUCCESS_CODE : true;
  },

  getInitialState() {
    const state = {
      global: {}
    };

    if (typeof window !== 'undefined') {
      return window.__INITIAL_STATE__ || state;
    }

    return state;
  },

  gotoUrl(url) {
    window.location.href = url;
  },

  gotoLoginUrl(from = '') {
    CommonUtil.gotoUrl(`/login?url=${from}`);
  },

  setCookie(name, value, exdays = 1) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toGMTString();
    document.cookie = name + '=' + value + '; ' + expires;
  },

  getCookie(name) {
    var key = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(key) === 0) return c.substring(key.length, c.length);
    }
    return null;
  },

  userLogin(name, password) {
    CommonUtil.setCookie(Constants.LOGIN_COOKIE_KEY, name);
    return true;
  },

  getUserNameFromCookie() {
    return CommonUtil.getCookie(Constants.LOGIN_COOKIE_KEY);
  },

  userLogout(name) {
    if (name === CommonUtil.getUserNameFromCookie()) {
      CommonUtil.setCookie(Constants.LOGIN_COOKIE_KEY, '');
    }
    return true;
  }
};

export default CommonUtil;
