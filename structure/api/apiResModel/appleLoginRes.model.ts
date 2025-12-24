interface appleLoginPresModel {
  result: 0 | 1;
  linked: 0 | 1;
  email: string;
  phone_no: string;
  township: string;
  city: string;
  refer_code: string;
  verify_status: 0 | 1;
  phone_number: string;
  operator: number;
  upd_dob: string;
  upd_gender: string;
  upd_job: string;
  new_user: 0 | 1;
  message: string;
}

export default appleLoginPresModel;
