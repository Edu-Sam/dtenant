<template>
    <div>
        <h1>Submit order</h1>
        <button @click="SubmitOrderRequest"></button>
    </div>
</template>

<script>
export default{
    data(){
      return{
          payload: {
              id: "EDWIN",
              currency: "KES",
              amount:1.00,
              description: "Trial Pay",
              callback_url: "https://d7tenant.herokuapp.com/transaction",
              notification_id: "",
              billing_address: {
                  email_address: "edungugi20@gmail.com",
                  phone_number: "+254702181403",
                  country_code: "KE",
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
          },}
    },
    methods : {
        async submitRequest(){
            const response = await this.axios.post('https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest',
            this.payload,{
            headers : {
        "Content-Type": "application/json",
        "Accept":"application/json",
                Authorization:
                    "Bearer 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",
            }

            }).then((data) => {
                console.log("response: " + JSON.stringify(data));
            });
        }
    }
}
</script>