<template>
    <div>
        <h1>Submit order 1</h1>
        <button class="btn btn-success" @click="createPaymentRequest">Submit Order Request1</button>
        <iframe class="myFrame" src="" id="myIframe" scrolling="no"></iframe>
    </div>
</template>

<script>
export default{
    data(){
      return{
          token:'',
          credentials:{
           consumer_key: "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW",
           consumer_secret: "osGQ364R49cXKeOYSpaOnT++rHs=",
          },
          payload: {
              id: "",
              currency: "KES",
              amount:1.00,
              description: "Credit",
              callback_url: "https://d7tenant.herokuapp.com/transaction",
              notification_id: "",
              billing_address: {
                  email_address: "edungugi20@gmail.com",
                  phone_number: "+254702181403",
                  country_code: "254",
                  first_name: "Edwin",
                  middle_name: "Ngugi",
                  last_name: "Mwangi",
                  line_1:"",
                  line_2:"",
                  city:"",
                  state:"",
                  postal_code: null,
                  zip_code: null
              }
          },
          ipn:{
              url: "https://d7tenant.herokuapp.com/ipn",
              ipn_notification_type: "GET"
          },
           order_tracking_id: "",
           merchant_reference:"",
           redirect_url:""

          }
    },
    methods : {
        async submitRequest(){
            console.log("notification id :" + this.payload.notification_id);
            console.log("id :" + this.payload.id);
            console.log("payload: " + JSON.stringify(this.payload));
            const response = await this.axios.post('https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest',
            this.payload,{
            headers : {
        "Content-Type": "application/json",
       /* "Accept":"application/json",*/
                Authorization:
                    "Bearer " + this.token,
            }

            }).then((data) => {
                console.log("submit response: " + JSON.stringify(data));
                console.log("The submit status is " + data.status);
                if(data.data.status==200){
                    this.order_tracking_id=data.data.order_tracking_id;
                this.merchant_reference=data.data.merchant_reference;
                this.redirect_url=data.data.redirect_url;
                window.location = this.redirect_url;
                console.log("the new url: " + this.redirect_url);
                }
            });
        },

         async requestToken(){
          const response = await this.axios.post('https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken',
          this.credentials,
          {
            headers : {
        "Content-Type": "application/json",
        "Accept":"application/json",
            }
            }).then((data) => {
                console.log("token response: " + JSON.stringify(data));
                 console.log("The request status is " + data.status);
                 console.log("The request token is " 
                 + data.data.token);
                if(data.status==200){
                    this.token = data.data.token;
                    return this.token;
                }
            });

            return response;
        },

        async registerIPN(){
            console.log("The token:" + this.token);
          const response = await this.axios.post('https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN',
          this.ipn,
          {
            headers : {
        "Content-Type": "application/json",
        "Accept":"application/json",
                Authorization:
                    "Bearer " + this.token,
            }
            }).then((data) => {
                console.log("register response: " + JSON.stringify(data));
                console.log("the register status is " + data.status);
                if(data.status==200){
                    this.payload.notification_id=data.data.ipn_id;
                    this.payload.id = data.data.id.toString();
                    return this.payload.notification_id;
                }
            });

            return response;
        },

        async createPaymentRequest(){
            const response = await this.requestToken()
            .then((data) => {
                this.registerIPN().then((data1) =>{
                  this.submitRequest();
                });
            });
        }
    }
}
</script>