import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import VueCookie from './VueCookie'
import axios from 'axios'
import Router from '../router'

const API = axios.create({
  baseURL: 'http://localhost:3333/api/v1'
})

const SweetAlert = {
  delete (title, text, type, confirmation, url, redirect = null) {
    swal({
      title: title,
      text: text,
      type: type,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Delete',
      preConfirm: () => {
        return API.delete(url, {
          headers: {
            'Authorization': `Bearer ${VueCookie.get('token')}`
          }
        })
          .then(response => {
            return response
          })
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        swal({
          type: 'success',
          title: confirmation
        })
        if (redirect) {
          Router.push(redirect)
        }
        console.log(result.value)
        return result.value
      }
    })
  },

  confirm (title, text) {
    swal({
      type: 'success',
      title: title,
      text: text
    })
  }
}

export default SweetAlert
