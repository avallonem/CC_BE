module.exports = mongoose => {
  const Asset = mongoose.model(
    "asset",
    mongoose.Schema(
      {
        title: String,
        description: String,
        terms: String,
        provider: String,
        address_provider: String,
        address_deposit_contract: String
      },
      { timestamps: true }
    )
  );

  return Asset;
};