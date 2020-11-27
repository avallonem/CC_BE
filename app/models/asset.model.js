module.exports = mongoose => {
  const Asset = mongoose.model(
    "asset",
    mongoose.Schema(
      {
        title: String,
        description: String,
        
      },
      { timestamps: true }
    )
  );

  return Asset;
};