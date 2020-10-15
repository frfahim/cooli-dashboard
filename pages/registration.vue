<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container grid-list-xl fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md8 lg8>
            <ValidationObserver ref="regForm" v-slot="{ invalid, validated, handleSubmit }">
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <!-- <img src="../static/m.png" alt="Enxpress" width="120" height="120"> -->
                  <h2 class="flex primary--text">Enxpress</h2>
                  <h4 class="flex pt-0 mb-2 primary--text">Merchant Registration</h4>
                </div>
                <v-form @submit.prevent="handleSubmit(submit)">
                  <v-layout row wrap>
                    <v-flex sm6 lg6>
                      <ValidationProvider name="shop_name" rules="required" v-slot="{ errors }">
                      <v-text-field
                        name="shop_name"
                        label="Business/Shop Name"
                        type="text"
                        v-model="customerForm.name"
                        :error-messages="errors"
                      ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <v-flex sm6 lg6>
                      <ValidationProvider name="shop_phone" rules="required|numeric|max:11" v-slot="{ errors }">
                      <v-text-field
                        name="shop_phone"
                        label="Business Phone Number"
                        type="number"
                        :error-messages="errors"
                        v-model="customerForm.phone"
                      ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex sm6 lg6>
                      <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                      <v-text-field
                        name="name"
                        label="Owner's Name"
                        type="text"
                        :error-messages="errors"
                        v-model="userForm.name"
                      ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <v-flex sm6 lg6>
                      <ValidationProvider name="phone" rules="required|numeric|max:11" v-slot="{ errors }">
                      <v-text-field
                        name="phone"
                        label="Business/Owners Phone Number"
                        type="number"
                        :error-messages="errors"
                        v-model="userForm.phone"
                      ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex sm6 lg6>
                      <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                      <v-text-field
                        name="email"
                        label="Email"
                        type="text"
                        :error-messages="errors"
                        v-model="userForm.email"
                      ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <v-flex sm6 lg6>
                      <v-text-field
                        name="website"
                        label="Website/ Social Media"
                        type="text"
                        v-model="customerForm.website"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <ValidationProvider name="address" rules="required" v-slot="{ errors }">
                  <v-text-field
                    name="address"
                    label="Business/Shop Address"
                    type="text"
                    :error-messages="errors"
                    v-model="customerForm.address"
                  ></v-text-field>
                  </ValidationProvider>

                  <ValidationProvider vid="payment" name="Payment Option" v-slot="{ errors }" rules="required">
                  <v-radio-group v-model="paymentMethod" row>
                    <v-radio label="Mobile(MFS)" value="mobile"></v-radio>
                    <v-radio label="Bank" value="bank"></v-radio>
                  </v-radio-group>
                  <span class="error--text">{{ errors[0] }}</span>
                  </ValidationProvider>

                  <template v-if="paymentMethod=='mobile'">
                    <v-layout row wrap>
                      <v-flex sm6 lg6>
                        <ValidationProvider name="options" rules="required" v-slot="{ errors }">
                        <v-select
                          :items="MFSOptions"
                          v-model="paymentForm.payment_option"
                          label="Select an Provider"
                          item-text="name"
                          item-value="value"
                          :error-messages="errors"
                        ></v-select>
                        </ValidationProvider>
                      </v-flex>
                      <v-flex sm6 lg6>
                        <ValidationProvider name="phone" rules="required|numeric|max:11" v-slot="{ errors }">
                        <v-text-field
                          label="Mobile Account Number"
                          placeholder
                          v-model="paymentForm.phone_number"
                          type="number"
                          :error-messages="errors"
                        ></v-text-field>
                        </ValidationProvider>
                      </v-flex>
                    </v-layout>
                  </template>

                  <template v-if="paymentMethod=='bank'">
                    <v-layout row wrap>
                      <v-flex sm6 lg6>
                        <ValidationProvider name="bank_name" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                          label="Bank"
                          placeholder="Select..."
                          :items="banks"
                          v-model="paymentForm.bank_name"
                          ref="bank_name"
                          :error-messages="errors"
                        ></v-autocomplete>
                        </ValidationProvider>
                      </v-flex>
                      <v-flex sm6 lg6>
                        <ValidationProvider name="branch" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="Branch"
                          placeholder
                          v-model="paymentForm.branch"
                          :error-messages="errors"
                        ></v-text-field>
                        </ValidationProvider>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex sm6 lg6>
                        <ValidationProvider name="routing_number" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="Routing No."
                          placeholder
                          v-model="paymentForm.routing_number"
                          :error-messages="errors"
                        ></v-text-field>
                        </ValidationProvider>
                      </v-flex>
                      <v-flex sm6 lg6>
                        <ValidationProvider name="account_type" rules="required" v-slot="{ errors }">
                        <v-autocomplete
                          label="A/C Type"
                          placeholder="Select..."
                          :items="account_types"
                          v-model="paymentForm.account_type"
                          item-value="key"
                          item-text="name"
                          ref="country"
                          :error-messages="errors"
                        ></v-autocomplete>
                        </ValidationProvider>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex sm6 lg6>
                        <ValidationProvider name="account_holder_name" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="A/C Holder Name"
                          placeholder
                          v-model="paymentForm.account_holder_name"
                          :error-messages="errors"
                        ></v-text-field>
                        </ValidationProvider>
                      </v-flex>
                      <v-flex sm6 lg6>
                        <ValidationProvider name="account_number" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="A/C No."
                          placeholder
                          v-model="paymentForm.account_number"
                          :error-messages="errors"
                        ></v-text-field>
                        </ValidationProvider>
                      </v-flex>
                    </v-layout>
                  </template>

                  <v-text-field
                    name="refereral_number"
                    label="Referral Number"
                    type="text"
                    v-model="customerForm.referral_number"
                  ></v-text-field>

                  <v-layout row wrap>
                    <v-flex sm6 lg6>
                      <ValidationProvider vid="password1" name="password" rules="required|password:@confirm_password" v-slot="{ errors }">
                      <v-text-field
                        name="password"
                        label="Password"
                        id="password1"
                        type="password"
                        :error-messages="errors"
                        v-model="userForm.password1"
                      ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <v-flex sm6 lg6>
                      <ValidationProvider vid="password2" name="confirm_password" rules="required" v-slot="{ errors }">
                      <v-text-field
                        name="password2"
                        label="Confirm Password"
                        id="password2"
                        type="password"
                        :error-messages="errors"
                        v-model="userForm.password2"
                      ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                  </v-layout>

                  <div d-inline-flex>
                    <div>
                      <input type="checkbox" id="terms" name="terms" value="terms" />
                      <label for="terms">
                        I agree with this
                        <b>
                          <a @click="termsDialog=true">Terms & Conditions</a>
                        </b>
                      </label>
                      <br />
                    </div>
                    <v-dialog v-if="termsDialog" v-model="termsDialog" width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">Terms & Conditions</span>
                          <v-spacer></v-spacer>
                          <v-btn icon @click.native="termsDialog = false">
                            <v-icon>close</v-icon>
                          </v-btn>
                        </v-card-title>
                        <v-card-text>
                          Entrepreneurs Express Ltd. (Enxpress) carries out the business of Delivery Service
                          which includes Delivery of Products/Parcels, Cash on Delivery, Return or Reverse
                          Pickup, and Custodian of Goods/Collected cash on behalf of its merchant.
                          Enxpress is offering an online platform for Merchant Registration, Placing Pick-up
                          request &amp; Delivery information, Payment Information, and other necessary
                          information.
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <p v-if="passwordNotMatched" class="routerLink mb-1 text-center">Password not mached</p>
              </v-card-actions>
              <v-card-actions>
                <!-- <v-btn block>
                  Register
                </v-btn>-->
                <!-- <v-spacer></v-spacer> -->
                <v-btn large block color="primary" @click="handleSubmit(submit)" :loading="loading">Registration</v-btn>
              </v-card-actions>
              <v-card-text>
                Already have an account?
                <router-link class="routerLink font-weight-bold" to="/login">Login</router-link>
              </v-card-text>
            </v-card>
            </ValidationObserver>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import banks from "@/api/banks";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import {required } from 'vee-validate/dist/rules'

extend("required", {
  ...required,
  message: "This field is required"
});

export default {
  layout: "default",
  data: () => ({
    loading: false,
    passwordNotMatched: false,
    formModel: {},
    userForm: {},
    customerForm: {},
    paymentForm: {},
    paymentMethod: "",
    termsCheckbox: false,
    termsDialog: false,
    errorMessages: null,
    rules: {
      required: (value) => !!value || "This field is required.",
      phone: (value) => (value && value.length <= 11) || "Max 11 characters",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    MFSOptions: [
      // {
      //   value: "bank",
      //   name: "Bank"
      // },
      {
        value: "bkash",
        name: "bKash",
      },
    ],
    banks: banks,
    account_types: [
      { key: "current", name: "Current" },
      { key: "savings", name: "Savings" },
      { key: "snd", name: "SND" },
    ],
  }),

  components: {
      ValidationProvider,
      ValidationObserver
  },

  mounted() {
    this.$store.dispatch("clearAllData");
  },

  methods: {
    submit() {
      this.loading = true;
      // if (!this.paymentMethod) {
      //   this.$refs.regForm.setErrors({
      //     payment: ['Select a payment option']
      //   });
      //   return
      // }
      if (this.paymentMethod == 'bank') {
        this.customerForm.payment_method = 'bank'
        this.paymentForm.payment_option = 'bank'
      } else {
        this.customerForm.payment_method = this.paymentForm.payment_option
      }
      console.log("form model", this.formModel);
      console.log("user", this.userForm);
      console.log("customer", this.customerForm);
      console.log("payment", this.paymentForm);
      let payload = {
        'name': this.userForm.name,
        'email': this.userForm.email,
        'phone': this.userForm.phone,
        'password1': this.userForm.password1,
        'password2': this.userForm.password2,
        'customer': this.customerForm,
        'payment': this.paymentForm,
      }
      this.$store
        .dispatch("registerUser", payload)
        .then((res) => {
          this.loading = false;
          this.$store.commit("removeLoading");
          this.$router.push("/login");
          this.$toast.success(`Registration Successful, ${res.data.user.name}`)
        })
        .catch((err) => {
          console.log(err.response.data);
          this.$store.commit("removeLoading");
          this.loading = false;
          this.$toast.error("Something went wrong")
          this.$refs.regForm.setErrors(err.response.data.data)
        });
    },
  },
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
.routerLink {
  text-decoration: none;
  color: red;
}
</style>
