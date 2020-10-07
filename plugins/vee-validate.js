import {
  required,
  email,
  max,
  max_value,
  min_value,
  oneOf,
  numeric,
} from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This {_field_} field is required"
});

extend("max", {
  ...max,
  message: "This {_field_} must be {length} characters or less"
});

extend("max_value", {
  ...max_value,
  message: "This {_field_} must be {max} or less"
});
extend("min_value", {
  ...min_value,
  message: "This {_field_} must be {min} or more"
});

extend("email", {
  ...email,
  message: "This {_field_} must be a valid email"
});

extend("oneOf", {
  ...oneOf,
  message: "This {_field_} must be a valid option"
});
extend("numeric", {
  ...numeric,
  message: "This {_field_} must be a number"
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password doesn't match"
});
