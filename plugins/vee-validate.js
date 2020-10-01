import { required, email, max } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This {_field_} field is required"
});

extend("max", {
  ...max,
  message: "This {_field_} must be {length} characters or less"
});

extend("email", {
  ...email,
  message: "This {_field_} must be a valid email"
});
