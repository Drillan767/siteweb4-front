const VueCookie = {
  get (cname) {
    const name = cname + '='
    const cArr = window.document.cookie.split(';')
    for (let i = 0; i < cArr.length; i++) {
      const c = cArr[i].trim()
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },

  set (cname, cvalue) {
    let d = new Date()
    d.setTime(d.getTime() + (1000 * 60 * 60 * 24))
    const expires = 'expires=' + d.toUTCString()
    window.document.cookie = cname + '=' + cvalue + '; ' + expires
  },

  delete (cname) {
    window.document.cookie = cname + '=' + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }
}

export default VueCookie
