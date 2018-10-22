import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3333/api/v1'
})

const SweetAlert = {
  delete (title, text, type, confirmation, url) {
    swal({
      title: title,
      text: text,
      type: type,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Delete',
      preConfirm: () => {
        return API.delete(url)
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
