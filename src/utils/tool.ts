/** 页面根据屏幕自动计算根节点的字体大小 */
export function initFontSize() {
  const docEl = document.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = () => {
    docEl.style.fontSize = 100 * (docEl.clientWidth / 375) + 'px'
  }
  window.addEventListener(resizeEvt, recalc, false)
  recalc()
}
