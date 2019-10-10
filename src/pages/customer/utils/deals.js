import { isNullOrUndefined } from 'util';

export function getEmailAndTel(customerInfo) {
  let phone = '';
  const phoneArr = ['-1', '-1', '-1', '-1'];
  let email = '';
  const emailArr = ['-1', '-1', '-1', '-1'];
  !isNullOrUndefined(customerInfo.contacts) &&
    customerInfo.contacts.forEach((ele, index) => {
      !isNullOrUndefined(ele.email) &&
        ele.email.length > 0 &&
        ele.email.forEach((eleItem, ItemIndex) => {
          if (eleItem.option === '100' && eleItem.status === '0') {
            if (ele.type === 'CMS' && eleItem.isPrimary === 1) {
              emailArr[0] = eleItem['contactInfo'];
            } else if (ele.type === 'CMS' && eleItem.isPrimary === 0) {
              emailArr[1] = eleItem['contactInfo'];
            } else if (ele.type === 'RCS' && eleItem.isPrimary === 1) {
              emailArr[2] = eleItem['contactInfo'];
            } else if (ele.type === 'RCS' && eleItem.isPrimary === 0) {
              emailArr[3] = eleItem['contactInfo'];
            } else {
              emailArr.push(eleItem['contactInfo']);
            }
          }
        });
      !isNullOrUndefined(ele.tel) &&
        ele.tel.length > 0 &&
        ele.tel.forEach((eleItem, ItemIndex) => {
          if (eleItem.status === '0') {
            if (eleItem.option === '111' || eleItem.option === '101') {
              let newTel =
                (eleItem.country ? '+' + eleItem.country.replace(/\s*/g, '') : '') +
                (eleItem.area ? '(' + eleItem.area.replace(/\s*/g, '') + ')' : '()') +
                eleItem.contactInfo.replace(/\s*/g, '');
              if (ele.type === 'CMS' && eleItem.isPrimary === 1) {
                phoneArr[0] = newTel;
              } else if (ele.type === 'CMS' && eleItem.isPrimary === 0) {
                phoneArr[1] = newTel;
              } else if (ele.type === 'RCS' && eleItem.isPrimary === 1) {
                phoneArr[2] = newTel;
              } else if (ele.type === 'RCS' && eleItem.isPrimary === 0) {
                phoneArr[3] = newTel;
              } else {
                phoneArr.push(newTel);
              }
            }
          }
        });
    });
  if (emailArr.length) {
    // eslint-disable-next-line no-restricted-syntax
    for (const emailArrNew of emailArr) {
      if (emailArrNew !== '-1') {
        email = emailArrNew;
        break;
      }
    }
  }
  if (phoneArr.length) {
    // eslint-disable-next-line no-restricted-syntax
    for (const phoneNew of phoneArr) {
      if (phoneNew !== '-1') {
        phone = phoneNew;
        break;
      }
    }
  }
  return {
    phone,
    email,
  };
}

// eslint-disable-next-line consistent-return
export default function encryption(type, target) {
  const start = Number((target.length * 0.25).toFixed(0));
  const end = Number((target.length * 0.75).toFixed(0));
  let starStr = '';
  for (let i = 0; i < end - start; i += 1) {
    starStr += '*';
  }
  if (type === 'phone') {
    return target.substr(0, start) + starStr + target.substr(end, target.length);
  }
  if (type === 'email') {
    return target.substr(0, start) + starStr + target.substr(end, target.length);
  }
}
