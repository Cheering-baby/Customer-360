import { parse } from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * Abbreviate Name
 *
 * @param  {string}    full name
 * @return {string}    abbreviate name
 */

// eslint-disable-next-line consistent-return
export function abbreviateName(name) {
  if (name) {
    const regEn = /.*[A-Za-z]+.*$/;
    const regCh = /.*[\u4e00-\u9fa5]+.*$/;
    const regSpecial = /.*[\s*\.*/g]+.*$/;
    const interceptName = (names, regs, language) => {
      const letterArr = names.split('');
      let firstPosition = null;
      let lastPosition = null;
      letterArr.map((item, index) => {
        if (regs.test(item) && !(!firstPosition >= 0)) {
          firstPosition = index;
        }
        if (
          (firstPosition === '0' || firstPosition) &&
          !regs.test(item) &&
          !regSpecial.test(item)
        ) {
          lastPosition = index;
        }
        return item;
      });
      let newArr = null;
      if (language === 'en') {
        newArr = lastPosition
          ? names.substring(firstPosition, lastPosition).split(' ')
          : names.substring(firstPosition, names.length).split(' ');
      }
      if (language === 'ch') {
        newArr = lastPosition
          ? names.substring(firstPosition, lastPosition)
          : names.substring(firstPosition, names.length);
      }
      return newArr;
    };
    if (regEn.test(name)) {
      // 取英文
      let enArr = interceptName(name, regEn, 'en');
      let newEnName = [];
      if (enArr.length > 2) {
        enArr = [enArr[0], enArr[enArr.length - 1]];
      }
      enArr.map(item => newEnName.push(item.substr(0, 1).toUpperCase()));
      newEnName = newEnName.join('');
      return newEnName;
    }
    if (!regEn.test(name) && regCh.test(name)) {
      // 取中文
      const chArr = interceptName(name, regCh, 'ch');
      if (chArr.length > 2) return chArr.substring(1, 3);
      if (chArr.length < 3) return chArr;
    }
  }
}

export function getQueryVariable(variable) {
  const query = window.location.href.split('?')[1] || '';
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}
