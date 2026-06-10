import { ref } from 'vue'

const showDoctorDetail = ref(false)
const selectedDoctorDetail = ref(null)

export function useDoctorDetail() {
  function showDoctor(doc) {
    selectedDoctorDetail.value = doc
    showDoctorDetail.value = true
  }
  return { showDoctorDetail, selectedDoctorDetail, showDoctor }
}
