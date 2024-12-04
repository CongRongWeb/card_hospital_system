import axios from "@/utils/request";
export function getUserList(data) {
  return axios({
    url: '/getUserList',
    method: 'post',
    data:data
  })
}
export function insertUserOrUpdate(data) {
  return axios({
    url: '/insertUserOrUpdate',
    method: 'post',
    data:data
  })
}

export function delUser(data) {
  return axios({
    url: '/delUser',
    method: 'post',
    data:data
  })
}


export function getSectionList(data) {
  return axios({
    url: '/getSectionList',
    method: 'post',
    data:data
  })
}

export function insertSectionOrUpdate(data) {
  return axios({
    url: '/insertSectionOrUpdate',
    method: 'post',
    data:data
  })
}

export function delSection(data) {
  return axios({
    url: '/delSection',
    method: 'post',
    data:data
  })
}

export function getNurse(data) {
  return axios({
    url: '/getNurse',
    method: 'post',
    data:data
  })
}

export function insertNurseOrUpdate(data) {
  return axios({
    url: '/insertNurseOrUpdate',
    method: 'post',
    data:data
  })
}

export function delNurse(data) {
  return axios({
    url: '/delNurse',
    method: 'post',
    data:data
  })
}


export function getDoctor(data) {
  return axios({
    url: '/getDoctor',
    method: 'post',
    data:data
  })
}

export function insertDoctorOrUpdate(data) {
  return axios({
    url: '/insertDoctorOrUpdate',
    method: 'post',
    data:data
  })
}

export function delDoctor(data) {
  return axios({
    url: '/delDoctor',
    method: 'post',
    data:data
  })
}

export function getMedicine(data) {
  return axios({
    url: '/getMedicine',
    method: 'post',
    data:data
  })
}

export function insertMedicineOrUpdate(data) {
  return axios({
    url: '/insertMedicineOrUpdate',
    method: 'post',
    data:data
  })
}

export function delMedicine(data) {
  return axios({
    url: '/delMedicine',
    method: 'post',
    data:data
  })
}


export function changePassword(data) {
  return axios({
    url: "/changePassword",
    method: "post",
    data
  });
}

export function login(data) {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}

export function getPatient(data) {
  return axios({
    url: '/getPatient',
    method: 'post',
    data:data
  })
}

export function insertPatientOrUpdate(data) {
  return axios({
    url: '/insertPatientOrUpdate',
    method: 'post',
    data:data
  })
}

export function delPatient(data) {
  return axios({
    url: '/delPatient',
    method: 'post',
    data:data
  })
}


export function getCharge(data) {
  return axios({
    url: '/getCharge',
    method: 'post',
    data:data
  })
}

export function insertChargeOrUpdate(data) {
  return axios({
    url: '/insertChargeOrUpdate',
    method: 'post',
    data:data
  })
}


export function getPay(data) {
  return axios({
    url: '/getPay',
    method: 'post',
    data:data
  })
}
export function getPayDetail(data) {
  return axios({
    url: '/getPayDetail',
    method: 'post',
    data:data
  })
}

export function chargePay(data) {
  return axios({
    url: '/chargePay',
    method: 'post',
    data:data
  })
}

export function getRegister(data) {
  return axios({
    url: '/getRegister',
    method: 'post',
    data:data
  })
}

export function insertRegisterOrUpdate(data) {
  return axios({
    url: '/insertRegisterOrUpdate',
    method: 'post',
    data:data
  })
}

export function getPatientMedicine(data) {
  return axios({
    url: '/getPatientMedicine',
    method: 'post',
    data:data
  })
}

export function insertPatientMedicineOrUpdate(data) {
  return axios({
    url: '/insertPatientMedicineOrUpdate',
    method: 'post',
    data:data
  })
}

export function getChufang(data) {
  return axios({
    url: '/getChufang',
    method: 'post',
    data:data
  })
}

export function insertChufangOrUpdate(data) {
  return axios({
    url: '/insertChufangOrUpdate',
    method: 'post',
    data:data
  })
}

export function getChufangDetail(data) {
  return axios({
    url: '/getChufangDetail',
    method: 'post',
    data:data
  })
}

export function quyaoApi(data) {
  return axios({
    url: '/quyaoApi',
    method: 'post',
    data:data
  })
}

export function getPatientVisit(data) {
  return axios({
    url: '/getPatientVisit',
    method: 'post',
    data:data
  })
}
export function getPatientVisitDetail(data) {
  return axios({
    url: '/getPatientVisitDetail',
    method: 'post',
    data:data
  })
}



