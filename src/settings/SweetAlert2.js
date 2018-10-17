import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

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
        return this.$axios.delete(url)
          .then(response => {
            return response.json()
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
  }
}

export default SweetAlert
