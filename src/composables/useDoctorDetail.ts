import { ref } from 'vue'

const showDoctorDetail = ref(false)
const selectedDoctorDetail = ref<any | null>(null)

export function useDoctorDetail() {
  function showDoctor(doc: any) {
    if (!doc) return
    selectedDoctorDetail.value = doc
    showDoctorDetail.value = true
  }

  function closeDoctorDetail() {
    showDoctorDetail.value = false
    selectedDoctorDetail.value = null
  }

  return { showDoctorDetail, selectedDoctorDetail, showDoctor, closeDoctorDetail }
}
