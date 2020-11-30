module.exports = mongoose => {
  const Customer = mongoose.model(
    "customer",
    mongoose.Schema(
      {
        given_name: String,
        family_name: String,
        fiscal_number: String,
        gender: String,
        date_of_birth: Date,
        contry_of_birth: String,
        place_of_birth: String,
        email_address: String,
        mobile_phone: String,
        profession: String,
        risk_type: String,
        asset_title: String,
        asset_description: String,
        asset_value: Number
      },
      { timestamps: true }
    )
  );

  return Customer;
};