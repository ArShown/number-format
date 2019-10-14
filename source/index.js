import utilHandler from './utils';

const number_format = function (number, formatStr = '0.2cr') {
  /* 檢查是不是建構式方式 */
  const isConstructor = this instanceof number_format;

  const _self = isConstructor ? this : {};

  _self._number = number;
  _self._format = formatStr => utilHandler(formatStr, _self._number);
  _self._result = _self._format(formatStr);

  /* 建構式方式的話就回傳自己，不是就直接傳結果 */
  return isConstructor ? _self : _self._result;
};

number_format.prototype.value = function value() {
  return this._result;
};

number_format.prototype.format = function format(formatStr = '0.2cr') {
  return this._format(formatStr);
};


export default number_format;
