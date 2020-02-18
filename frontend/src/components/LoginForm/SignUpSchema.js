export default {
  province_or_state: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 31
    }
  },
  country: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 31
    }
  },
  role: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 31
    }
  },
  user_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 31
    }
  },
  first_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 31
    }
  },
  last_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 31
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 31
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 31
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};
